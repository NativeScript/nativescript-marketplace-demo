import observable = require("data/observable");
import pages = require("ui/page");
import gestures = require("ui/gestures");
import conferenceViewModel = require("./conference-view-model");
import list = require("ui/list-view");
import utils = require("utils/utils");
import {View} from "ui/core/view";

export function pageLoaded(args: observable.EventData) {
    var page = <pages.Page>args.object;
    page.bindingContext = conferenceViewModel.instance;

    // disable selection
    var sessionsList = <list.ListView>page.getViewById("sessions-list");
    if (sessionsList.android) {
        sessionsList.android.setSelector(new android.graphics.drawable.ColorDrawable(0));
    }
    if (sessionsList.ios) {
        sessionsList.ios.allowsSelection = false;
    }

    // set elevation for android search-bar
    var search = <View>page.getViewById("search");
    if (search && search.android) {
        var compat = <any>android.support.v4.view.ViewCompat;
        if (compat.setElevation) {
            // Fix for the elevation glitch of the tab-view
            compat.setElevation(search.android, 4 * utils.layout.getDisplayDensity());
        }
    }
}

export function toggleFavourite(args: gestures.GestureEventData) {
    var session = <conferenceViewModel.Session>args.view.bindingContext;
    session.toggleFavourite();
}

