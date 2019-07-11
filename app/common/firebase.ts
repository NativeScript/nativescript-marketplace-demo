import * as application from "tns-core-modules/application";
import * as utils from "tns-core-modules/utils/utils";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { isAndroid, isIOS } from "tns-core-modules/platform";
import * as settings from "tns-core-modules/application-settings";
import { Observable } from "tns-core-modules/data/observable";
import * as navigator from "../common/navigator";

const enabled = true;

interface FirebaseArticle {
    readonly id: string;
    readonly title: string;
    readonly body: string;
    readonly url: string;
    readonly date: string;
}

const FIREBASE_NEWS_INITAL = "firebase:news:inital";
const FIREBASE_NEWS_READ_KEY = "firebase:news:read";
let _readArticles;
function loadReadArticles() {
    if (_readArticles) {
        return _readArticles;
    }

    const str = settings.getString(FIREBASE_NEWS_READ_KEY, "{}");
    try {
        _readArticles = JSON.parse(str);
    } catch(e) {
        console.log("Failed to parse read firebase articles.");
        _readArticles = {};
    }

    return _readArticles;
}

function saveReadArticles() {
    try {
        settings.setString(FIREBASE_NEWS_READ_KEY, JSON.stringify(loadReadArticles()));
    } catch(e) {
        console.log("Failed to persist read articles: " + e);
    }
}

function getIsArticleRead(id: string): boolean {
    return !!loadReadArticles()[id];
}

function markAsRead(id: string) {
    loadReadArticles()[id] = true;
    saveReadArticles();
}
function markAllAsRead() {
    let readArticles = loadReadArticles();
    viewModel.news.filter(n => n && n.id).forEach(n => readArticles[n.id] = true);
    console.log("Maked as read: " + JSON.stringify(readArticles));
    saveReadArticles();
    viewModel.updateHasUnreadNews();
}
function markAsUnread(id: string) {
    loadReadArticles()[id] = false;
    saveReadArticles();
}
function markAllAsReadOnFirstRun() {
    const isInitalRun = settings.getBoolean(FIREBASE_NEWS_INITAL, true);
    if (isInitalRun) {
        markAllAsRead();
        settings.setBoolean(FIREBASE_NEWS_INITAL, false);
    }
}

export class Article extends Observable {
    readonly id: string;
    readonly title: string;
    readonly body: string;
    readonly url: string;
    readonly date: string;

    constructor(base: FirebaseArticle) {
        super();
        this.id = base.id;
        this.title = base.title;
        this.body = base.body;
        this.url = base.url;
        this.date = base.date;
    }

    get isRead(): boolean {
        return !!(this.id && getIsArticleRead(this.id));
    }
    set isRead(value: boolean) {
        if (value && this.id) {
            markAsRead(this.id);
        } else {
            markAsUnread(this.id);
        }
        this.notifyPropertyChange("isRead", value);
        viewModel.updateHasUnreadNews();
    }
}

export class ViewModel extends Observable {
    news: Article[];
    hasNews: boolean = false;
    hasUnreadNews: boolean = false;

    constructor() {
        super();
        this.updateNews([]);
    }

    updateNews(updates: FirebaseArticle[]) {
        this.news = updates.filter(fb => !!fb).map(fb => new Article(fb));
        this.updateHasNews();
        this.updateHasUnreadNews();
        this.notifyPropertyChange("news", this.news);
    }

    updateHasNews() {
        let newValue = this.news && this.news.length > 0;
        if (newValue != this.hasNews) {
            this.hasNews = newValue;
            this.notifyPropertyChange("hasNews", newValue);
        }
    }

    updateHasUnreadNews() {
        let newValue = this.news && this.news.length > 0 && this.news.some(args => !args.isRead);
        if (newValue != this.hasUnreadNews) {
            this.hasUnreadNews = newValue;
            this.notifyPropertyChange("hasUnreadNews", newValue);
            console.log("hasUnreadNews: " + this.hasUnreadNews);
        }
    }
}
export const viewModel = new ViewModel();

var firebase;
var lastHandledData;

export function init() {
    if (!enabled) {
        return;
    }

    firebase = require("nativescript-plugin-firebase");
    var userGrantedPush = settings.getBoolean("user-granted-push", false);
    if (isAndroid) {
        // Android doesn't ask permissions so go for firebase initialization on launch.
        firebaseInit();
    } else if (userGrantedPush) {
        // For iOS, if the user haven't granted push permissions yet, wait for the intro animation to complete.
        application.on("launch", args => {
            firebaseInit();
        });
    }
}

export function onAfterIntro() {
    if (!enabled) {
        return;
    }

    // iOS asks for permissions so ask after the intro has played the first time.
    if (isIOS && !settings.getBoolean("user-granted-push", false)) {
        firebaseInit();
    }
}

function firebaseInit() {
    if (!enabled) {
        return;
    }

    console.log("Firebase init!!!");

    firebase.init({
        persist: true
    }).then(value => {
        firebase.addValueEventListener((result) => {
            if (!result.error) {
                console.log("Update news: " + JSON.stringify(result.value))
                viewModel.updateNews(result.value || []);
                markAllAsReadOnFirstRun();
            } else {
                console.log(JSON.stringify(result));
            }
        }, "/news").then((listenerWrapper) => {
            const path = listenerWrapper.path;
            const listeners = listenerWrapper.listeners
            console.log("Listening for firebase data. path: " + path + ", listeners: " + listeners);
        });
    }).catch(e => {
        console.log("Failed to init firebase. " + e);
        console.log("stack:\n" + e.stack);
    });
}
