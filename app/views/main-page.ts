import observable = require("data/observable");
import pages = require("ui/page");
import frame = require("ui/frame");
import gestures = require("ui/gestures");
import examplesVM = require("../view-models/examples-model")
import mainPageVM = require("../view-models/main-page-view-model");
import groupPageVM = require("../view-models/group-page-view-model");
import examplePageVM = require("../view-models/example-info-page-view-model");
import navigator = require("../common/navigator");
import prof = require("../common/profiling");

var page;

export function onPageLoaded(args: observable.EventData) {
    // Get the event sender
    page = <pages.Page>args.object;
    page.bindingContext = mainPageVM.instance;

    if (page.ios) {
        // TODO: Making the navigation bar transparent. It would be nice if this was property on the ActionBar.
        var bar = frame.topmost().ios.controller.navigationBar;
        bar.setBackgroundImageForBarMetrics(UIImage.new(), UIBarMetrics.UIBarMetricsDefault);
        bar.translucent = true;
        bar.shadowImage = UIImage.new();
        bar.tintColor = UIColor.whiteColor();


        // TODO: Is it possible to style the title color of the action bar?
        (<any>bar).titleTextAttributes = { [NSForegroundColorAttributeName]: UIColor.whiteColor() };

        var sideDrawerView = page.getViewById("side-drawer");
        sideDrawerView.ios.sideDrawer.style.shadowMode = TKSideDrawerShadowMode.TKSideDrawerShadowModeSideDrawer;
        sideDrawerView.ios.sideDrawer.style.dimOpacity = 0.5;
    }
}

// TODO: The tap="{{ toggleWrapLayout }}" in the XML doesn't seem to work.
export function toggleWrapLayout(e: any) {
    e.object.bindingContext.toggleWrapLayout();
}

export function navigateToExampleGroup(args: gestures.GestureEventData) {
    prof.start("group");

    page.getViewById("side-drawer").closeDrawer();
    var exampleGroup = <examplesVM.ExampleGroup>(<any>args).object.bindingContext;
    var context = new groupPageVM.GroupPageViewModel(exampleGroup, false);
    navigator.navigateToExampleGroup(context);
}

export function navigateToExample(args: gestures.GestureEventData) {
    //prof.startCPUProfile("example");
    prof.start("example");

    page.getViewById("side-drawer").closeDrawer();
    var example = <examplesVM.Example>(<any>args).object.bindingContext;
    var context = new examplePageVM.ExamplePageViewModel(example);
    navigator.navigateToExample(context);
}

export function showSlideout(args) {
    page.getViewById("side-drawer").toggleDrawerState();
}

export function tapHome(args) {
    //prof.startCPUProfile("profile");
    page.getViewById("side-drawer").closeDrawer();
}

export function tapAbout(args) {
    //prof.stopCPUProfile("profile");
    page.getViewById("side-drawer").closeDrawer();
    navigator.navigateToAbout();
}

export function tapDrawerLink(args) {
    page.getViewById("side-drawer").closeDrawer();
    navigator.openLink(args.object);
}
