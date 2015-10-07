import view = require("ui/core/view")
import pages = require("ui/page")
import gestures = require("ui/gestures");
import observable = require("data/observable");
import examplesVM = require("../view-models/examples-model");
import navigator = require("../common/navigator");
import groupVM = require("../view-models/group-page-view-model");
import examplePageVM = require("../view-models/example-info-page-view-model");

export function pageNavigatingTo(args: pages.NavigatedData) {
    // Get the event sender
    var page = <pages.Page>args.object;
    page.bindingContext = args.context;
}

export function navigateToExample(args: gestures.GestureEventData) {
    var example = <examplesVM.Example>args.view.bindingContext;
    var vm = <groupVM.GroupPageViewModel>args.view.page.bindingContext;

    var context = new examplePageVM.ExamplePageViewModel(example);
    navigator.navigateToExample(context);
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
