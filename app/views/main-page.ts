import observable = require("data/observable");
import pages = require("ui/page");
import frame = require("ui/frame");
import gestures = require("ui/gestures");
import examplesVM = require("../view-models/examples-model")
import mainPageVM = require("../view-models/main-page-view-model");
import groupPageVM = require("../view-models/group-page-view-model");
import examplePageVM = require("../view-models/example-info-page-view-model");
import navigator = require("../common/navigator");

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
    }
}

// TODO: The tap="{{ toggleWrapLayout }}" in the XML doesn't seem to work.
export function toggleWrapLayout(e: any) {
    e.object.bindingContext.toggleWrapLayout();
}

export function navigateToExampleGroup(args: gestures.GestureEventData) {
    var exampleGroup = <examplesVM.ExampleGroup>args.view.bindingContext;
    var context = new groupPageVM.GroupPageViewModel(exampleGroup, false);
    navigator.navigateToExampleGroup(context);
}

export function navigateToExample(args: gestures.GestureEventData) {
    console.log("Navigate to example...");
    var example = <examplesVM.Example>args.view.bindingContext;
    var context = new examplePageVM.ExamplePageViewModel(example);
    navigator.navigateToExample(context);
}

export function showSlideout(args) {
    page.getViewById("side-drawer").showDrawer();
}

export function tapHome(args) {
    console.log("Tab: Home!");
}

export function tabAbout(args) {
    console.log("Tab: About!");
}

export function tapGettingStarted(args) {
    console.log("Tab: Getting Started!");
}

export function tapDocumentation(args) {
    console.log("Tab: Documentation!");
}

export function tapSDKExamples(args) {
    console.log("Tab: SDK Examples!");
}

export function tapProductPage(args) {
    console.log("Tab: Product page!");
}
