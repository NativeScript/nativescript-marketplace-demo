import * as pages from "tns-core-modules/ui/page";
import * as view from "tns-core-modules/ui/core/view";
import * as gestures from "tns-core-modules/ui/gestures";
import * as observable from "tns-core-modules/data/observable";
import * as navigator from "../common/navigator";

// Event handler for Page "navigatedTo" event attached in details-page.xml
export function pageNavigatingTo(args: pages.NavigatedData) {
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