import observable = require("data/observable");
import pages = require("ui/page");
import frame = require("ui/frame");
import gestures = require("ui/gestures");
import examplesVM = require("../view-models/examples-model")
import mainPageVM = require("../view-models/main-page-view-model");
import groupPageVM = require("../view-models/group-page-view-model");
import examplePageVM = require("../view-models/example-info-page-view-model");
import navigator = require("../common/navigator");

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    var page = <pages.Page>args.object;
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
    var example = <examplesVM.Example>args.view.bindingContext;

    // Find the group of the example based on the fist control
    var controlToSearch = example.controls[0];
    var group: examplesVM.ExampleGroup;
    for (var index = 0; index < examplesVM.groups.length; index++) {
        group = examplesVM.groups[index];
        if (group.controls.indexOf(controlToSearch) >= 0) {
            break;
        }
    }

    var context = new examplePageVM.ExamplePageViewModel(example, group.controls);
    navigator.navigateToExample(context);
}

export function controlTap(args: gestures.GestureEventData) {
    var control = <string>args.view.bindingContext;
    var context = groupPageVM.getGroupForControl(control);
    navigator.navigateToExampleGroup(context);
}

export function showSlideout(args){
    console.log("TODO: Show slideout ...");
}
