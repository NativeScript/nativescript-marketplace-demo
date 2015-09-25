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

export function pageNavigatingTo(args: pages.NavigatedData) {
    var page = <pages.Page>args.object;
    var vm = <examplePageVM.ExamplePageViewModel>args.context;
    page.bindingContext = vm;
    
    // NOTE: Views does not belong to the view model, so we will maintain the currentExampleView in the view.
    var currentExampleView: view.View;
    var thumbsContainer = page.getViewById("thumbs-layout");
    (<any>thumbsContainer)._eachChildView(v => {
        var isCurrent = v.bindingContext == vm.currentExample;
        if (isCurrent) {
            currentExampleView = v;
        }

        // TODO: If the state animation is applied immediately,
        // or the properties are set immediately,
        // the scale gets into account for the iOS layout.
        setTimeout(function() {
            // TODO: Consider moving the initialization in "loaded" of the items.
            // For now there is a bug that "loaded" is invoked before the bindingContext is set.
            thumbGotoState(v, isCurrent ? "selected" : "unselected", false);
        }, 100);
    });
    
    var particles = ["p1", "p2", "p3", "p4", "p5"].map(l => page.getViewById(l));
    particlesGotoState(particles, vm.examples.indexOf(vm.currentExample), false);

    function currentExampleChangedHandler(e: observable.PropertyChangeData) {
        if (e.propertyName === "currentExample") {
            thumbGotoState(currentExampleView, "unselected", true);
            (<any>thumbsContainer)._eachChildView((v: view.View) => {
                if (v.bindingContext === e.value) {
                    currentExampleView = v;
                    thumbGotoState(v, "selected", true);
                }
            });
            
            particlesGotoState(particles, vm.examples.indexOf(vm.currentExample), true);
        }
    };
    vm.on("propertyChange", currentExampleChangedHandler);

    // NOTE: We must unsubscribe from the view model, otherwise the view will leak as long as the view model is alive.
    function navigatedFromHandler(e: pages.NavigatedData) {
        vm.off("propertyChange", currentExampleChangedHandler);
        page.off("navigatedFrom", navigatedFromHandler);
    };
    page.on("navigatedFrom", navigatedFromHandler);
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

    if (vm.currentExample === exampleVM) {
        showExamplePage(vm.currentExample);
    }
    else {
        vm.currentExample = exampleVM;
    }
}

function showExamplePage(example: examplePageVM.ExampleViewModel) {
    // TODO: plug in animations here.
    if (!example.path) {
        alert("No path for this example");
        return;
    }

    frame.topmost().navigate({
        animated: true,
        moduleName: example.path,
    });
}

function thumbGotoState(view: view.View, state: string, animated: boolean) {
    if (!view) {
        return;
    }

    var selectionOverlay = view.getViewById("selected-example-border");
    var anims = new Array<animations.AnimationDefinition>();
    switch(state) {
        case "selected":
            anims.push({ target: view, scale: { x: 1, y: 1 }, curve: CURVE, duration: animated ? 150 : 0 });
            anims.push({ target: selectionOverlay, opacity: 1, curve: CURVE, duration: animated ? 150 : 0 });
            break;
        case "unselected":
            anims.push({ target: view, scale: { x: 0.8, y: 0.8 }, curve: CURVE, duration: animated ? 250 : 0 });
            anims.push({ target: selectionOverlay, opacity: 0, curve: CURVE, duration: animated ? 250 : 0 });
            break;
    }
    var animation = new animations.Animation(anims);
    animation.play();
}

var particleStates = [
    [
        { opacity: 0.5, scale: { x: 0.8, y: 0.8 }, translate: { x: 50, y: 20 }, duration: 1000 },
        { opacity: 0.6, scale: { x: 0.7, y: 0.7 }, translate: { x: 60, y: 40 }, duration: 800 },
        { opacity: 0.8, scale: { x: 0.9, y: 0.9 }, translate: { x: 40, y: 30 }, duration: 1400 },
        { opacity: 0.4, scale: { x: 0.6, y: 0.6 }, translate: { x: 70, y: 50 }, duration: 1800 },
        { opacity: 0.7, scale: { x: 1.0, y: 1.0 }, translate: { x: 80, y: 60 }, duration: 2000 }
    ], [
        { opacity: 0.5, scale: { x: 0.8, y: 0.8 }, translate: { x: 50, y: 20 }, duration: 1000 },
        { opacity: 0.6, scale: { x: 0.7, y: 0.7 }, translate: { x: 60, y: 40 }, duration: 800 },
        { opacity: 0.8, scale: { x: 0.9, y: 0.9 }, translate: { x: 40, y: 30 }, duration: 1400 },
        { opacity: 0.4, scale: { x: 0.6, y: 0.6 }, translate: { x: 70, y: 50 }, duration: 1800 },
        { opacity: 0.7, scale: { x: 1.0, y: 1.0 }, translate: { x: 80, y: 60 }, duration: 2000 }
    ], [
        { opacity: 0.5, scale: { x: 0.8, y: 0.8 }, translate: { x: 50, y: 20 }, duration: 1000 },
        { opacity: 0.6, scale: { x: 0.7, y: 0.7 }, translate: { x: 60, y: 40 }, duration: 800 },
        { opacity: 0.8, scale: { x: 0.9, y: 0.9 }, translate: { x: 40, y: 30 }, duration: 1400 },
        { opacity: 0.4, scale: { x: 0.6, y: 0.6 }, translate: { x: 70, y: 50 }, duration: 1800 },
        { opacity: 0.7, scale: { x: 1.0, y: 1.0 }, translate: { x: 80, y: 60 }, duration: 2000 }
    ], [
        { opacity: 0.5, scale: { x: 0.8, y: 0.8 }, translate: { x: 50, y: 20 }, duration: 1000 },
        { opacity: 0.6, scale: { x: 0.7, y: 0.7 }, translate: { x: 60, y: 40 }, duration: 800 },
        { opacity: 0.8, scale: { x: 0.9, y: 0.9 }, translate: { x: 40, y: 30 }, duration: 1400 },
        { opacity: 0.4, scale: { x: 0.6, y: 0.6 }, translate: { x: 70, y: 50 }, duration: 1800 },
        { opacity: 0.7, scale: { x: 1.0, y: 1.0 }, translate: { x: 80, y: 60 }, duration: 2000 }
    ], [
        { opacity: 0.5, scale: { x: 0.8, y: 0.8 }, translate: { x: 50, y: 20 }, duration: 1000 },
        { opacity: 0.6, scale: { x: 0.7, y: 0.7 }, translate: { x: 60, y: 40 }, duration: 800 },
        { opacity: 0.8, scale: { x: 0.9, y: 0.9 }, translate: { x: 40, y: 30 }, duration: 1400 },
        { opacity: 0.4, scale: { x: 0.6, y: 0.6 }, translate: { x: 70, y: 50 }, duration: 1800 },
        { opacity: 0.7, scale: { x: 1.0, y: 1.0 }, translate: { x: 80, y: 60 }, duration: 2000 }
    ]
];

function particlesGotoState(particles: view.View[], stateIndex: number, animated: boolean) {
    var anims = particles.map((particle, particleIndex) => {
        var state = particleStates[particleIndex][stateIndex];
        return {
            target: particle,
            //opacity: state.opacity,
            //scale: state.scale,
            translate: state.translate,
            curve: CURVE,
            duration: animated ? state.duration : 0
        };
    });
    
    var animation = new animations.Animation(anims);
    animation.play();
}
