import pages = require("ui/page");
import view = require("ui/core/view");
import label = require("ui/label");
import repeater = require("ui/repeater");
import gestures = require("ui/gestures");
import grid = require("ui/layouts/grid-layout");
import observable = require("data/observable");
import animations = require("ui/animation");
import frame = require("ui/frame");
import builder = require("ui/builder");
import navigator = require("../common/navigator");
import examplesVM = require("../view-models/examples-model")
import examplePageVM = require("../view-models/example-info-page-view-model")

var exampleContainerID = "examples-container";

// Event handler for Page "navigatedTo" event attached in details-page.xml
export function pageNavigatedTo(args: pages.NavigatedData) {
    // Get the event sender
    var page = <pages.Page>args.object;
    var context = <examplePageVM.ExamplePageViewModel>args.context;
    page.bindingContext = context;

    var exampleRepeater = page.getViewById(exampleContainerID);
    var currentExampleView: view.View;
    view.eachDescendant(exampleRepeater, (v) => {
        if (v.cssClass === "selected-example") {
            currentExampleView = v;
            return false;
        }
        return true;
    })
    if (currentExampleView) {
        selectExample(currentExampleView);
    }
}

export function navigateBack(args: gestures.GestureEventData) {
    navigator.navigateBack();
}

export function exampleTap(args: gestures.GestureEventData) {
    var exampleView = args.view;
    var exampleRepeater = <repeater.Repeater>exampleView.parent;
    var page = exampleView.page;

    var tappedExample = <examplesVM.Example> args.view.bindingContext;
    var vm = <examplePageVM.ExamplePageViewModel>page.bindingContext;

    if (vm.currentExample !== tappedExample) {
        var currentExampleView: view.View;
        view.eachDescendant(exampleRepeater, (v) => {
            if (v.cssClass === "selected-example") {
                currentExampleView = v;
                return false;
            }
            return true;
        })

        if (currentExampleView) {
            unselectExample(currentExampleView);
        }

        vm.set("currentExample", tappedExample);
        selectExample(exampleView);
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

export function showCodeTap(args: observable.EventData) {
    var context = <examplePageVM.ExamplePageViewModel>(<view.View>args.object).bindingContext;
    navigator.navigateToCode(context.currentExample);
}

export function openLink(args: observable.EventData) {
    navigator.openLink(args.object);
}

function selectExample(exampleView: view.View) {
    exampleView.animate({
        scale: { x: 1.1, y: 1.1 },
        curve: new android.view.animation.BounceInterpolator(),
    });
}

function unselectExample(exampleView: view.View) {
    exampleView.animate({
        scale: { x: 1, y: 1 },
        curve: new android.view.animation.BounceInterpolator()
    });
}