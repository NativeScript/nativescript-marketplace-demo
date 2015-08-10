import pages = require("ui/page");
import view = require("ui/core/view");
import label = require("ui/label");
import gestures = require("ui/gestures");
import grid = require("ui/layouts/grid-layout");
import observable = require("data/observable");
import animations = require("ui/animation");
import frame = require("ui/frame");
import builder = require("ui/builder");
import navigator = require("../common/navigator");
import examplesVM = require("../view-models/examples-model")
import examplePageVM = require("../view-models/example-page-view-model")

// Event handler for Page "navigatedTo" event attached in details-page.xml
export function pageNavigatedTo(args: pages.NavigatedData) {
    // Get the event sender
    var page = <pages.Page>args.object;
    var context = <examplePageVM.ExamplePageViewModel>args.context;
    page.bindingContext = context;
}

export function navigateBack(args: gestures.GestureEventData) {
    navigator.navigateBack();
}

export function exampleTap(args: gestures.GestureEventData) {
    var page = <pages.Page>view.getAncestor(args.view, "Page");

    var tappedExample = <examplesVM.Example> args.view.bindingContext;
    var vm = <examplePageVM.ExamplePageViewModel>page.bindingContext;

    if (vm.currentExample !== tappedExample) {
        vm.set("currentExample", tappedExample);
    }
    else {
        // TODO: plug in animations here.
        if (!vm.currentExample.path) {
            alert("No path for this example")
        }
        else {
            frame.topmost().navigate({
                animated: true,
                moduleName: vm.currentExample.path,
            });
        }
    }
}

