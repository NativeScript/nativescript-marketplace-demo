import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
import { View } from "ui/core/view";
import { Color } from "color";
import { ListView, ItemEventData } from "ui/list-view";
import { GestureEventData } from "ui/gestures";
import { SearchBar } from "ui/search-bar";
import * as platform from "platform";
import * as navigator from "../../common/navigator";
import * as linearGradient from "../../common/linear-gradient";
import * as conferenceViewModel from "./conference-view-model";

export function pageNavigatingTo(args: EventData) {
    var page = <Page>args.object;
    page.bindingContext = conferenceViewModel.instance;
}

export function doNotShowAndroidKeyboard(args: EventData) {
    let searchBar = <SearchBar>args.object;
    if (searchBar.android){
        searchBar.android.clearFocus();
    }
}

export function onBackgroundLoaded(args: EventData) {
    let background = <View>args.object;
    let colors = new Array<Color>(new Color("#67749b"), new Color("#5b677b"));
    let orientation = linearGradient.Orientation.Top_Bottom;
    
    switch (platform.device.os) {
        case platform.platformNames.android:
            linearGradient.drawBackground(background, colors, orientation);
            break;
        case platform.platformNames.ios:
            // The iOS view has to be sized in order to apply a background
            setTimeout(() => {
                linearGradient.drawBackground(background, colors, orientation);
            });
            let search = background.getViewById("search");
            search.ios.backgroundImage = UIImage.alloc().init();
            break;
    }
}

export function changeCellBackground(args: ItemEventData) {
    if (args.ios){
        var cell = <UITableViewCell>args.ios;
        cell.backgroundColor = UIColor.clearColor();
    }
}

export function toggleFavourite(args: GestureEventData) {
    var session = <conferenceViewModel.Session>args.view.bindingContext;
    session.toggleFavourite();
}

var closeTimeout: number = 0;
export function inputTap(args) {
    if (closeTimeout) {
        clearTimeout(closeTimeout);
    }
    closeTimeout = setTimeout(() => {
        closeTimeout = 0;
    }, 20);
}

export function tap(args: EventData) {
    var page = (<View>args.object).page;
    if (!closeTimeout) {
        closeTimeout = setTimeout(() => {
            page.getViewById<SearchBar>("search").dismissSoftInput();
            closeTimeout = 0;
        }, 20);
    }
}

export function goBack(args: EventData) {
    navigator.navigateBackFromExample();
}