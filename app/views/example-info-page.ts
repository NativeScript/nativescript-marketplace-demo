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
import platfrom = require("platform")

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

var CURVE = (platfrom.device.os === platfrom.platformNames.android) ? new android.view.animation.DecelerateInterpolator(1) : UIViewAnimationCurve.UIViewAnimationCurveEaseIn;
var BIG_SCALED = { x: 1.2, y: 1.2 };
var NORMAL_SCALE = { x: 1, y: 1 };
var DURATION = 150;

function selectExample(exampleView: view.View) {
    var anims = new Array<animations.AnimationDefinition>();
    anims.push({ target: exampleView, scale: BIG_SCALED, curve: CURVE, duration: DURATION });

    // view.eachDescendant(exampleView, (v) => {
    //     if (v.cssClass.indexOf("select-element") >= 0) {
    //         anims.push({ target: v, opacity: 1, curve: CURVE })
    //     }
    //     return true;
    // })

    var animation = new animations.Animation(anims);
    animation.play();
}

function unselectExample(exampleView: view.View) {
    var anims = new Array<animations.AnimationDefinition>();
    anims.push({ target: exampleView, scale: NORMAL_SCALE, curve: CURVE, duration: DURATION });

    // view.eachDescendant(exampleView, (v) => {
    //     if (v.cssClass.indexOf("select-element") >= 0) {
    //         anims.push({ target: v, opacity: 0, curve: CURVE })
    //     }
    //     return true;
    // })

    var animation = new animations.Animation(anims);
    animation.play();
}