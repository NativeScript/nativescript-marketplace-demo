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
import platform = require("platform")
import prof = require("../common/profiling");

var exampleContainerID = "examples-container";
var CURVE = (platform.device.os === platform.platformNames.android) ? new android.view.animation.DecelerateInterpolator(1) : UIViewAnimationCurve.UIViewAnimationCurveEaseIn;

export function pageNavigatingTo(args: pages.NavigatedData) {
    var page = <pages.Page>args.object;
    var vm = <examplePageVM.ExampleInfoPageViewModel>page.navigationContext;
    page.bindingContext = vm;
    
    if (!vm.currentExample) 
        throw new Error("Expected current example to be set...");
    
    // NOTE: Views does not belong to the view model, so we will maintain the currentExampleView in the view.
    var currentExampleView: view.View;
    var thumbsContainer = page.getViewById("thumbs-layout");
    
    thumbsContainer.on("loaded", function() {
        (<any>thumbsContainer)._eachChildView(v => {
            var isCurrent = v.bindingContext == vm.currentExample;
            if (isCurrent) {
                currentExampleView = v;
            }
    
            thumbGotoState(v, isCurrent ? "selected" : "unselected", false);
        });
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
    var context = <examplePageVM.ExampleInfoPageViewModel>(<view.View>args.object).bindingContext;
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
    var vm = <examplePageVM.ExampleInfoPageViewModel>exampleView.page.bindingContext;
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

    prof.start("example");
    // prof.startCPUProfile("example");

    navigator.navigateToExample(example.example);
}

function thumbGotoState(view: view.View, state: string, animated: boolean) {
    if (!view) {
        return;
    }

    var selectionOverlay = view.getViewById("selected-example-border");

    if (animated) {
        var anims = new Array<animations.AnimationDefinition>();
        switch(state) {
            case "selected":
                anims.push({ target: view, scale: { x: 1, y: 1 }, curve: CURVE, duration: 150 });
                anims.push({ target: selectionOverlay, opacity: 1, curve: CURVE, duration: 150 });
                break;
            case "unselected":
                anims.push({ target: view, scale: { x: 0.8, y: 0.8 }, curve: CURVE, duration: 250 });
                anims.push({ target: selectionOverlay, opacity: 0, curve: CURVE, duration: 250 });
                break;
        }
        var animation = new animations.Animation(anims);
        animation.play();
    } else {
        switch(state) {
            case "selected":
                view.scaleX = 1;
                view.scaleY = 1;
                selectionOverlay.opacity = 1;
                break;
            case "unselected":
                view.scaleX = 0.8;
                view.scaleY = 0.8;
                selectionOverlay.opacity = 0;
                break;
        }
    }

}

var particleStates = [
    [
        { opacity: 0.5, translate: { x: 0.05, y: 0.50 }, duration: 1000 },
        { opacity: 0.6, translate: { x: 0.10, y: 0.50 }, duration: 800 },
        { opacity: 0.8, translate: { x: 0.15, y: 0.50 }, duration: 1400 }
    ], [
        { opacity: 0.5, translate: { x: 0.10, y: 0.80 }, duration: 1000 },
        { opacity: 0.6, translate: { x: 0.15, y: 0.75 }, duration: 800 },
        { opacity: 0.8, translate: { x: 0.20, y: 0.70 }, duration: 1400 }
    ], [
        { opacity: 0.5, translate: { x: 0.22, y: 0.70 }, duration: 1000 },
        { opacity: 0.6, translate: { x: 0.32, y: 0.70 }, duration: 800 },
        { opacity: 0.8, translate: { x: 0.42, y: 0.70 }, duration: 1400 }
    ], [
        { opacity: 0.5, translate: { x: 0.70, y: 0.60 }, duration: 1000 },
        { opacity: 0.6, translate: { x: 0.80, y: 0.65 }, duration: 800 },
        { opacity: 0.8, translate: { x: 0.90, y: 0.70 }, duration: 1400 }
    ], [
        { opacity: 0.5, translate: { x: 0.80, y: 0.45 }, duration: 1000 },
        { opacity: 0.6, translate: { x: 0.85, y: 0.40 }, duration: 800 },
        { opacity: 0.8, translate: { x: 0.90, y: 0.35 }, duration: 1400 }
    ]
];

function particlesGotoState(particles: view.View[], stateIndex: number, animated: boolean) {
    setTimeout(() => {
        
        if (animated) {
            var anims = particles.map((particle, particleIndex) => {
                var states = particleStates[particleIndex]; 
                var state = states[stateIndex % states.length];
                
                var screenWidth = platform.screen.mainScreen.widthDIPs;
                var screenHeight = platform.screen.mainScreen.heightDIPs;
                
                var animation = {
                    target: particle,
                    // opacity: state.opacity,
                    translate: {
                        x: state.translate.x * screenWidth,
                        y: state.translate.y * (screenHeight - 180) // TODO: Take the action bar and the thumbs at the bottom into account
                    },
                    curve: CURVE,
                    duration: state.duration
                };
                return animation;
            });
            
            var animation = new animations.Animation(anims);
            animation.play();
        } else {
            particles.forEach((particle, particleIndex) => {
                var states = particleStates[particleIndex]; 
                var state = states[stateIndex % states.length];
                
                var screenWidth = platform.screen.mainScreen.widthDIPs;
                var screenHeight = platform.screen.mainScreen.heightDIPs;
                
                particle.translateX = state.translate.x * screenWidth;
                particle.translateY = state.translate.y * (screenHeight - 180);
            });
        }

    }, 1);
}
