import observableModule = require("data/observable");
import observableArray = require("data/observable-array");
import lvModule = require("nativescript-telerik-ui-pro/listview");
import applicationModule = require("application");
import utilsModule = require("utils/utils");
import frame = require("ui/frame");

import {listView} from "./main-page";

var DELTA = 0.1;

class BlogPostItemData extends observableModule.Observable {

    constructor(title: string, content: string, summary: string, fav: boolean, id: number) {
        super();
        this.Title = title;
        this.Content = content;
        this.Summary = summary;
        this.IsFavourite = fav;
        this.ID = id;
        this.reorderActive = false;
        this.isSelected = false;
    }

    get isSelected(): boolean {
        return this.get("_isSelected");
    }

    set isSelected(value: boolean) {
        this.set("_isSelected", value);
    }

    get ID(): number {
        return this.get("_id");
    }

    set ID(value: number) {
        this.set("_id", value);
    }

    get reorderActive(): boolean {
        return this.get("_reorderActive");
    }

    set reorderActive(value: boolean) {
        this.set("_reorderActive", value);
    }

    get Title(): string {
        return this.get("_title");
    }

    set Title(value: string) {
        this.set("_title", value);
    }

    get Content(): string {
        return this.get("_content");
    }

    set Content(value: string) {
        this.set("_content", value);
    }

    get IsFavourite() {
        return this.get("_isFavourite");
    }

    set IsFavourite(value: boolean) {
        this.set("_isFavourite", value);
    }

    get Summary() {
        return this.get("_summary");
    }

    set Summary(value: string) {
        this.set("_summary", value);
    }
}

export class ListView_ViewModel extends observableModule.Observable {
    constructor() {
        super();
        this.isReorderActive = false;
        this.isSelectionActive = false;
        this.Mode = "ALL";
        this._itemsBackup = new Array<BlogPostItemData>();
        this._itemsBackup.push(new BlogPostItemData(
            "Master the Essentials of UI Test Automation: Chapter One",
            "Chapter One: Introduction The goal of this series is to help you understand the right questions to ask of you, your team and your organization. There won't be any Best Practices; there won't be any silver bullets. What we hope is to convey the right information to help you get started on the right foot and get through some of the most common problems teams hit when starting out with UI test automation.",
            "Chapter One: Introduction The goal of this series is to help you understand the right questions to ask of you, your team and your organization. There won't be any Best Practices; there won't be any silver bullets.",
            false, 1));
        this._itemsBackup.push(new BlogPostItemData(
            "Send Data to Apple Watch with Core Data and Telerik UI for iOS in Swift",
            "The Apple Watch has been a long rumored device which finally appeared in September, followed by a Watch SDK, called WatchKit, in November. The introduction of the SDK maybe raised more questions than it answered, and we like everybody else are looking into the future for answers from Apple. One such question is: how can I send data, larger than what is allowed for a push notification, from the iPhone to the Watch?",
            "The Apple Watch has been a long rumored device which finally appeared in September, followed by a Watch SDK, called WatchKit, in November.",
            true, 2));
        this._itemsBackup.push(new BlogPostItemData(
            "6 Key Steps to Successful Agile Testing Projects",
            "Application teams are continuously adopting agile software techniques as the principal method of building applications. Agile methodologies, such as Scrum, Extreme Programming, Feature-Driven Development and Test-Driven Development offer the ability to iteratively develop applications.",
            "Application teams are continuously adopting agile software techniques as the principal method of building applications. Agile methodologies, such as Scrum, Extreme Programming, Feature-Driven Development and Test-Driven Development offer the ability to iteratively develop applications.",
            true, 3));
        this._itemsBackup.push(new BlogPostItemData(
            "Telerik UI for Xamarin Now Supports Xamarin.Forms 1.3.0",
            "Recently, the Xamarin guys came with a so to say major version of Xamarin.Forms, 1.3.0. This version brought enhancements as well as some changes that required some internal changes on our side. We are well aware that you will want to benefit from the Xamarin.Forms improvements immediately, while still using Telerik UI for Xamarin, so I am happy to announce the availability of a new UI for Xamarin version supporting Xamarin.Forms 1.3.0. Feel free to NuGet-update your Telerik UI for Xamarin projects to Xamarin.Forms 1.3.0.",
            "Recently, the Xamarin guys came with a so to say major version of Xamarin.Forms, 1.3.0. This version brought enhancements as well as some changes that required some internal changes on our side.",
            false, 4));
        this._itemsBackup.push(new BlogPostItemData(
            "Increase Your Mobile App Engagement. Become Part of the Web of Apps.",
            "Mobile developers are facing some severe limitations when it comes to app distribution: app content is almost invisible to browser search, app-to-app connections are scarce, and app updates need to go through a tedious re-submission process on the relevant marketplace. How can Google App Indexing, deep linking and Google Tag Manager for mobile apps help in the process of overcoming these limitations?",
            "Mobile developers are facing some severe limitations when it comes to app distribution: app content is almost invisible to browser search, app-to-app connections are scarce, and app updates need to go through a tedious re-submission process on the relevant marketplace.",
            true, 5));
        this._itemsBackup.push(new BlogPostItemData(
            "Building a Seismograph App with CoreMotion, Swift and Telerik UI for iOS",
            "Data visualizations are important, especially on small screen areas, where Excel files or other tables are difficult to read and comprehend. Visualizations are even more important when you add the various sensors that an iPhone device offers, not to mention the different certified third-party devices. Today, I will show you how you can set up the Telerik Chart for iOS to live-stream data coming from the accelerometer sensor using the CoreMotion API.",
            "Data visualizations are important, especially on small screen areas, where Excel files or other tables are difficult to read and comprehend.",
            false, 6));
        this._itemsBackup.push(new BlogPostItemData(
            "Application Performance Monitoring with the Crittercism Cordova Plugin",
            "As hybrid mobile apps scale to massive amounts of users and tremendous amount of data, developers need to monitor and trace the app’s performance. Crittercism is the world's first mobile application performance management (mAPM) solution, offering both error monitoring and service monitoring solutions. The Crittercism service monitors every aspect of mobile app performance, allowing Developers and IT Operations to deliver high performing, highly reliable, highly available mobile apps.",
            "As hybrid mobile apps scale to massive amounts of users and tremendous amount of data, developers need to monitor and trace the app’s performance.",
            false, 7));
    }

    private _currentItemIndex: number;

    public reorderToggled(state: boolean) {
        this.isReorderActive = state;
        for (var i = 0; i < this.lvItems.length; i++) {
            this.lvItems.getItem(i).reorderActive = state;
        }
    }

    get selectedItemsCount() {
        return this.get("_selectedItemsCount");
    }

    set selectedItemsCount(value: number) {
        this.set("_selectedItemsCount", value);
    }

    get isSelectionActive() {
        return this.get("_isSelectionActive");
    }

    set isSelectionActive(value: boolean) {
        this.set("_isSelectionActive", value);
    }

    get isReorderActive() {
        return this.get("_isReorderActive");
    }

    set isReorderActive(value: boolean) {
        this.set("_isReorderActive", value);
    }

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

    private updateCurrentState() {
        this.reorderToggled(false);
        this._lvItems.splice(0, this._lvItems.length);
        if (this.Mode == "ALL") {
            for (var i = 0; i < this._itemsBackup.length; ++i) {
                this._lvItems.push(this._itemsBackup[i]);
            }
        } else {
            for (var i = 0; i < this._itemsBackup.length; ++i) {
                if (this._itemsBackup[i].IsFavourite === true) {
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
    onItemTap(args: lvModule.ListViewEventData) {
        if (this.isSelectionActive === true || this.isReorderActive === true) {
            return;
        }
        var listView = frame.topmost().getViewById("theListView");
        this.CurrentItem = listView.items.getItem(args.itemIndex);
        this._currentItemIndex = args.itemIndex;
        frame.topmost().navigate({
            moduleName: "examples/listview/selection/detail-page",
            animated: true,
            context: this
        });
    }

    onStartSwipeCell(args: lvModule.ListViewEventData) {
        var density = utilsModule.layout.getDisplayDensity();
        var delta = Math.floor(density) !== density ? 1.1 : DELTA;

        args.data.swipeLimits.top = 0;
        args.data.swipeLimits.left = Math.round(density * 100);
        args.data.swipeLimits.bottom = 0;
        args.data.swipeLimits.right = Math.round(density * 100);
        args.data.swipeLimits.threshold = Math.round(density * 50);
    }

    onCellSwiped(args: lvModule.ListViewEventData) {
        var listView = frame.topmost().getViewById("theListView");
        this._currentItemIndex = args.itemIndex;
    }

    onTap_SetAsFavourite(args: any) {
        var tmp = this.lvItems.getItem(this._currentItemIndex);
        tmp.IsFavourite = !tmp.IsFavourite;

        if (tmp.IsFavourite === false && this.Mode === "FAVOURITES") {
            this.lvItems.splice(this._currentItemIndex, 1);
        }

        var listView = frame.topmost().getViewById("theListView");
        if (listView) {
            listView.notifySwipeToExecuteFinished();
        }
    }

    onTap_DeletePost(args: any) {
        this.deleteItemAt(this._currentItemIndex)
    }

    private deleteItemAt(index: number) {
        this._itemsBackup.splice(index, 1);
        this.lvItems.splice(index, 1);
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
    }

    public onItemSelected(args) {
        if (this.isSelectionActive === true) {
            var listView = frame.topmost().getViewById("theListView");
            this.selectedItemsCount = listView.getSelectedItems().length;
            this.lvItems.getItem(args.itemIndex).isSelected = true;
        }
    }

    public onItemDeselected(args) {
        var listView = frame.topmost().getViewById("theListView");
        this.selectedItemsCount = listView.getSelectedItems().length;
        this.lvItems.getItem(args.itemIndex).isSelected = false;
    }

    public onItemHold(args) {
        if (this.isReorderActive || this.isSelectionActive) {
            return;
        }
        var listView = frame.topmost().getViewById("theListView");
        if (applicationModule.android && this.isSelectionActive === false) {
            this.toggleSelection(args.itemIndex);
        }
    }

    public onAddAllToFavoritesTap(args) {
        var listView = frame.topmost().getViewById("theListView");
        var selectedItems = listView.getSelectedItems();
        for (var i = 0; i < selectedItems.length; i++) {
            var currentItem = selectedItems[i];
            currentItem.IsFavourite = !currentItem.IsFavourite;
        }

        if (applicationModule.android) {
            this.turnOffSelection();
        }
    }

    public onActivateReorderTap(args) {
        var listView = frame.topmost().getViewById("theListView");
        var selectedItems: Array<any> = listView.getSelectedItems();
        this.isReorderActive = !this.isReorderActive;
        this.reorderToggled(this.isReorderActive);
        if (applicationModule.ios) {
            if (this.isReorderActive === true) {
                this.toggleSelection(-1);
            } else if (this.isReorderActive === false) {
                for (var i = 0; i < selectedItems.length; i++) {
                    var selectedItem = selectedItems[i];
                    listView.deselectItemAt(listView.items.indexOf(selectedItem));
                    selectedItem.isSelected = false;
                }
                this.turnOffSelection();
            }
        }
    }

    public onBackImageTap(args) {
        this.turnOffSelection();
        this.reorderToggled(false);
    }

    public onDeleteAllTap(args) {
        var listView = frame.topmost().getViewById("theListView");
        var selectedItems = listView.getSelectedItems();
        for (var i = 0; i < selectedItems.length; i++) {
            var currentItem = selectedItems[i];
            this.deleteItemAt(this.lvItems.indexOf(currentItem));
        }

        if (applicationModule.android) {
            this.turnOffSelection();
        }
    }

    private turnOffSelection() {
        listView.deselectAll();
        listView.selectionBehavior = "None";
        this.isSelectionActive = false;
        listView.multipleSelection = false;
    }

    private toggleSelection(initialIndex: number) {
        this.isSelectionActive = true;
        if (initialIndex !== -1) {
            listView.selectItemAt(initialIndex);
        }
        listView.selectionBehavior = "Press";
        listView.multipleSelection = true;
    }
}
