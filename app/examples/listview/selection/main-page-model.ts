import observableModule = require("data/observable");
import observableArray = require("data/observable-array");
import lvModule = require("nativescript-telerik-ui/listview")
import utilsModule = require("utils/utils");
import frame = require("ui/frame");

import {listView} from "./main-page";

var DELTA = 0.1;

class BlogPostItemData extends observableModule.Observable {
    constructor(title: string, content: string, fav: boolean, id: number) {
        super();
        this.Title = title;
        this.Content = content;
        this.IsFavourite = fav;
        this.ID = id;
    }
    public ID: number;
    public Title: string;
    public Content: string;
    public IsFavourite: boolean;
}

export class ListView_ViewModel extends observableModule.Observable {
    constructor() {
        super();
        this.Mode = "ALL";
        this._itemsBackup = new Array<BlogPostItemData>();
        this._itemsBackup.push(new BlogPostItemData(
            "Master the Essentials of UI Test Automation: Chapter One",
            "Chapter One: Introduction The goal of this series is to help you understand the right questions to ask of you, your team and your organization. There won't be any Best Practices; there won't be any silver bullets. What we hope is to convey the right information to help you get started on the right foot and get through some of the most common problems teams hit when starting out with UI test automation.",
            false, 1));
        this._itemsBackup.push(new BlogPostItemData(
            "Send Data to Apple Watch with Core Data and Telerik UI for iOS in Swift",
            "The Apple Watch has been a long rumored device which finally appeared in September, followed by a Watch SDK, called WatchKit, in November. The introduction of the SDK maybe raised more questions than it answered, and we like everybody else are looking into the future for answers from Apple. One such question is: how can I send data, larger than what is allowed for a push notification, from the iPhone to the Watch?",
            true, 2));
        this._itemsBackup.push(new BlogPostItemData(
            "6 Key Steps to Successful Agile Testing Projects",
            "Application teams are continuously adopting agile software techniques as the principal method of building applications. Agile methodologies, such as Scrum, Extreme Programming, Feature-Driven Development and Test-Driven Development offer the ability to iteratively develop applications.",
            true, 3));
        this._itemsBackup.push(new BlogPostItemData(
            "Telerik UI for Xamarin Now Supports Xamarin.Forms 1.3.0",
            "Recently, the Xamarin guys came with a so to say major version of Xamarin.Forms, 1.3.0. This version brought enhancements as well as some changes that required some internal changes on our side. We are well aware that you will want to benefit from the Xamarin.Forms improvements immediately, while still using Telerik UI for Xamarin, so I am happy to announce the availability of a new UI for Xamarin version supporting Xamarin.Forms 1.3.0. Feel free to NuGet-update your Telerik UI for Xamarin projects to Xamarin.Forms 1.3.0.",
            false, 4));
        this._itemsBackup.push(new BlogPostItemData(
            "Increase Your Mobile App Engagement. Become Part of the Web of Apps.",
            "Mobile developers are facing some severe limitations when it comes to app distribution: app content is almost invisible to browser search, app-to-app connections are scarce, and app updates need to go through a tedious re-submission process on the relevant marketplace. How can Google App Indexing, deep linking and Google Tag Manager for mobile apps help in the process of overcoming these limitations?",
            true, 5));
        this._itemsBackup.push(new BlogPostItemData(
            "Building a Seismograph App with CoreMotion, Swift and Telerik UI for iOS",
            "Data visualizations are important, especially on small screen areas, where Excel files or other tables are difficult to read and comprehend. Visualizations are even more important when you add the various sensors that an iPhone device offers, not to mention the different certified third-party devices. Today, I will show you how you can set up the Telerik Chart for iOS to live-stream data coming from the accelerometer sensor using the CoreMotion API.",
            false, 6));
        this._itemsBackup.push(new BlogPostItemData(
            "Application Performance Monitoring with the Crittercism Cordova Plugin",
            "As hybrid mobile apps scale to massive amounts of users and tremendous amount of data, developers need to monitor and trace the app’s performance. Crittercism is the world's first mobile application performance management (mAPM) solution, offering both error monitoring and service monitoring solutions. The Crittercism service monitors every aspect of mobile app performance, allowing Developers and IT Operations to deliver high performing, highly reliable, highly available mobile apps.",
            false, 7));
    }

    private _currentItemIndex: number;

    get Mode() {
        return this.get("currentMode");
    }

    set Mode(value) {
        this.set("currentMode", value);
    }

    get CurrentItem() {
        return this.get("currentItem");
    }

    set CurrentItem(value) {
        this.set("currentItem", value);
    }


    //main repository for items
    private _itemsBackup: Array<BlogPostItemData>;
    private removeBackupItemByID(id: number) {
        for (var i = 0; i < this._itemsBackup.length; ++i) {
            if (this._itemsBackup[i].ID === id) {
                this._itemsBackup.splice(i, 1);
            }
        }
    }
    private updateBackupItem(newItem: BlogPostItemData) {
        for (var i = 0; i < this._itemsBackup.length; ++i) {
            if (this._itemsBackup[i].ID === newItem.ID) {
                this._itemsBackup[i].Title = newItem.Title;
                this._itemsBackup[i].Content = newItem.Content;
                this._itemsBackup[i].IsFavourite = newItem.IsFavourite;
            }
        }
    }

    private updateCurrentState() {
        this._lvItems.splice(0, this._lvItems.length);
        if (this.Mode == "ALL") {
            for (var i = 0; i < this._itemsBackup.length; ++i) {
                this._lvItems.push(this._itemsBackup[i]);
            }
        } else {
            for (var i = 0; i < this._itemsBackup.length; ++i) {
                if (this._itemsBackup[i].IsFavourite) {
                    this._lvItems.push(this._itemsBackup[i]);
                }
            }
        }
    }

    //bound to listview array with current visible items
    private _lvItems: observableArray.ObservableArray<BlogPostItemData>;
    public get lvItems(): observableArray.ObservableArray<BlogPostItemData> {
        if (this._lvItems) {
            return this._lvItems;
        }

        this._lvItems = new observableArray.ObservableArray<BlogPostItemData>();
        for (var i = 0; i < this._itemsBackup.length; ++i) {
            this._lvItems.push(this._itemsBackup[i]);
        }

        return this._lvItems;
    }

    //Event handlers
    onlvItemSelected(args: lvModule.ListViewEventData) {

        this.CurrentItem = this.lvItems.getItem(args.itemIndex);
        frame.topmost().navigate({
            moduleName: "examples/listview/selection/detail-page",
            animated: true,
            context: this.CurrentItem
        });
    }

    onItemTapped(args: lvModule.ListViewEventData) {
        console.log("ItemTapped");
    }

    onStartSwipeCell(args: lvModule.ListViewEventData) {
        console.log("==>swiped")
        var density = utilsModule.layout.getDisplayDensity();
        var delta = Math.floor(density) !== density ? 1.1 : DELTA;

        args.data.swipeLimits.top = 0;
        args.data.swipeLimits.left = Math.round(density * 100);
        args.data.swipeLimits.bottom = 0;
        args.data.swipeLimits.right = Math.round(density * 100);
        args.data.swipeLimits.threshold = Math.round(density * 50);
    }

    onCellSwiped(args: lvModule.ListViewEventData) {
        this._currentItemIndex = args.itemIndex;
    }

    onTap_SetAsFavourite(args: any) {
        var tmp = this.lvItems.getItem(this._currentItemIndex);
        tmp.IsFavourite = !tmp.IsFavourite;
        this.lvItems.setItem(this._currentItemIndex, tmp);
        this.updateBackupItem(this.lvItems.getItem(this._currentItemIndex));
    }

    onTap_DeletePost(args: any) {
        this.removeBackupItemByID(this.lvItems.getItem(this._currentItemIndex).ID);
        this.lvItems.splice(this._currentItemIndex, 1);
    }

    onTap_FavoritesMode(args) {
        if (this.Mode !== "FAVOURITES") {
            this.Mode = "FAVOURITES";
            this.updateCurrentState();
        }
    }

    onTap_AllMode(args) {
        if (this.Mode !== "ALL") {
            this.Mode = "ALL";
            this.updateCurrentState();
        }
    }
    onBackTapped() {
        frame.goBack();
        console.log("onBackTapped")
    }
}
