import observable = require("data/observable");
import pages = require("ui/page");
import gestures = require("ui/gestures");
import examplesVM = require("../view-models/examples-view-model")
import navigator = require("../common/navigator")

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    var page = <pages.Page>args.object;

    page.bindingContext = examplesVM;
}

export function navigateToExampleGroup(args: gestures.GestureEventData) {
    var exampleGroup = <examplesVM.ExampleGroup>args.view.bindingContext;
    navigator.navigateToExampleGroup(exampleGroup);
}

export function navigateToExample(args: gestures.GestureEventData) {
    var example = <examplesVM.Example>args.view.bindingContext;
    navigator.navigateToExample(example);
}