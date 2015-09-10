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
var CURVE = (platfrom.device.os === platfrom.platformNames.android) ? new android.view.animation.DecelerateInterpolator(1) : UIViewAnimationCurve.UIViewAnimationCurveEaseIn;
var BIG_SCALED = { x: 1.2, y: 1.2 };
var NORMAL_SCALE = { x: 1, y: 1 };
var DURATION = 150;

// Event handler for Page "navigatedTo" event attached in details-page.xml
export function pageNavigatedTo(args: pages.NavigatedData) {
    // Get the event sender
    var page = <pages.Page>args.object;
    var vm = <examplePageVM.ExamplePageViewModel>args.context;
    page.bindingContext = vm;

    var exampleRepeater = page.getViewById(exampleContainerID);
    var currentExampleView: view.View;
    view.eachDescendant(exampleRepeater, (v) => {
        if (v.bindingContext === vm.currentExample) {
            currentExampleView = v;
            return false;
        }
        return true;
    })

    if (currentExampleView) {
        selectNewExample(currentExampleView, vm.currentExample, vm);
    }
}

export function showCodeTap(args: observable.EventData) {
    var context = <examplePageVM.ExamplePageViewModel>(<view.View>args.object).bindingContext;
    navigator.navigateToCode(context.currentExample);
}

export function openLink(args: observable.EventData) {
    navigator.openLink(args.object);
}

export function navigateBack(args: gestures.GestureEventData) {
    navigator.navigateBack();
}

export function exampleTap(args: gestures.GestureEventData) {
    var exampleView = args.view;
    var vm = <examplePageVM.ExamplePageViewModel>exampleView.page.bindingContext;
    var exampleVM = <examplePageVM.ExampleViewModel> exampleView.bindingContext;

    if (vm.currentExample !== exampleVM) {
        selectNewExample(exampleView, exampleVM, vm);
    }
    else {
        showExamplePage(vm.currentExample);
    }
}

function showExamplePage(example: examplePageVM.ExampleViewModel) {
    // TODO: plug in animations here.
    if (!example.path) {
        alert("No path for this example")
    }
    else {
        frame.topmost().navigate({
            animated: true,
            moduleName: example.path,
        });
    }
}

function selectNewExample(exampleView: view.View, exampleVM: examplePageVM.ExampleViewModel, vm: examplePageVM.ExamplePageViewModel) {
    if (vm.currentExampleView) {
        unselectExample(vm.currentExampleView, vm);
    }

    selectExample(exampleView, exampleVM, vm);
}

function unselectExample(exampleView: view.View, vm: examplePageVM.ExamplePageViewModel) {
    if (vm.currentExample) {
        vm.currentExample.set("isSelected", false);
    }
    vm.set("currentExample", null);
    vm.currentExampleView = null;

    var anims = new Array<animations.AnimationDefinition>();
    anims.push({ target: exampleView, scale: NORMAL_SCALE, curve: CURVE, duration: DURATION });
    var animation = new animations.Animation(anims);

    animation.play();
}


function selectExample(exampleView: view.View, exampleVM: examplePageVM.ExampleViewModel, vm: examplePageVM.ExamplePageViewModel) {
    vm.currentExampleView = exampleView;
    vm.set("currentExample", exampleVM);

    var anims = new Array<animations.AnimationDefinition>();
    anims.push({ target: exampleView, scale: BIG_SCALED, curve: CURVE, duration: DURATION });
    var animation = new animations.Animation(anims);

    animation.play().finished.then(() => {
        exampleVM.set("isSelected", true)
    });
}