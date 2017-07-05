import * as view from "ui/core/view"
import * as pages from "ui/page"
import * as gestures from "ui/gestures";
import * as observable from "data/observable";
import * as examplesVM from "../../view-models/examples-model";
import * as navigator from "../../common/navigator";
import * as groupVM from "../../view-models/group-page-view-model";
import * as examplePageVM from "../../view-models/example-info-page-view-model";
import * as prof from "../../common/profiling";
import { grayTouch } from "../../common/effects";

var page;

export function pageNavigatingTo(args: pages.NavigatedData) {
    // Get the event sender
    page = <pages.Page>args.object;
    page.bindingContext = args.context;
}

export function pageLoaded() {
    prof.stop("group");
}

export function tileTouch(args: gestures.TouchGestureEventData) {
    grayTouch(args);
}

export function navigateToExample(args: gestures.GestureEventData) {
    var example = <examplesVM.Example>args.view.bindingContext;
    var vm = <groupVM.GroupPageViewModel>args.view.page.bindingContext;

    navigator.navigateToExample(example, example.group.examples);
}

export function navigateBack(args: gestures.GestureEventData) {
    navigator.navigateBack();
}

// TODO: The tap="{{ toggleWrapLayout }}" in the XML doesn't seem to work.
export function toggleWrapLayout(e: any) {
    e.object.bindingContext.toggleWrapLayout();
}

export function infoTap(args: observable.EventData) {
    var currentContext = <groupVM.GroupPageViewModel>(<view.View>args.object).bindingContext;
    navigator.navigateToGroupInfo(currentContext.group);
}

export function showSlideout(args) {
    page.getViewById("side-drawer").toggleDrawerState();
}