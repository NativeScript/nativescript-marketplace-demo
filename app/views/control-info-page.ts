import pages = require("ui/page");
import view = require("ui/core/view");
import gestures = require("ui/gestures");
import observable = require("data/observable");
import navigator = require("../common/navigator");

// Event handler for Page "navigatedTo" event attached in details-page.xml
export function pageNavigatedTo(args: pages.NavigatedData) {
    // Get the event sender
    var page = <pages.Page>args.object;
    page.bindingContext = args.context;
}

export function navigateBack(args: gestures.GestureEventData) {
    navigator.navigateBack();
}

export function openLink(args:  observable.EventData) {
    navigator.openLink(args.object);
}