import view = require("ui/core/view")
import pages = require("ui/page")
import gestures = require("ui/gestures");
import observable = require("data/observable");
import examplesVM = require("../view-models/examples-model");
import navigator = require("../common/navigator");
import groupVM = require("../view-models/group-page-view-model");
import examplePageVM = require("../view-models/example-info-page-view-model");

// Event handler for Page "navigatedTo" event attached in details-page.xml
export function pageNavigatedTo(args: pages.NavigatedData) {
    // Get the event sender
    var page = <pages.Page>args.object;
    page.bindingContext = args.context;
}

export function navigateToExample(args: gestures.GestureEventData) {
    var example = <examplesVM.Example>args.view.bindingContext;
    var vm = <groupVM.GroupPageViewModel>args.view.page.bindingContext;

    var context = new examplePageVM.ExamplePageViewModel(example, vm.group.controls);
    navigator.navigateToExample(context);
}

export function navigateBack(args: gestures.GestureEventData) {
    navigator.navigateBack();
}

export function controlTap(args: gestures.GestureEventData) {
    var control = <string>args.view.bindingContext;
    var page = args.view.page;

    var currentContext = <groupVM.GroupPageViewModel> page.bindingContext;
    var newContext = groupVM.getGroupForControl(control);

    if (currentContext.isSingleControl) {
        page.bindingContext = newContext;
    }
    else {
        navigator.navigateToExampleGroup(newContext);
    }
}

export function infoTap(args: observable.EventData) {
    var currentContext = <groupVM.GroupPageViewModel>(<view.View>args.object).bindingContext;

    var infoContext: examplesVM.ControlInfo;
    if (currentContext.isSingleControl) {
        infoContext = examplesVM.controlInfos.get(currentContext.group.controls[0]);
    }
    else {
        infoContext = currentContext.group;
    }

    navigator.navigateToControlInfo(infoContext);
}