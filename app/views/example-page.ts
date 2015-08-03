import pages = require("ui/page");
import view = require("ui/core/view");
import label = require("ui/label");
import gestures = require("ui/gestures");
import grid = require("ui/layouts/grid-layout");
import observable = require("data/observable");
import animations = require("ui/animation");
import builder = require("ui/builder");
import navigator = require("../common/navigator");
import examplesVM = require("../view-models/examples-view-model")
import examplePageVM = require("../view-models/example-page-view-model")

var exampleContainerID = "example-container";
var exampleViewID = "example-view";
var infoViewID = "info-view";

// Event handler for Page "navigatedTo" event attached in details-page.xml
export function pageNavigatedTo(args: pages.NavigatedData) {
    // Get the event sender
    var page = <pages.Page>args.object;
    var example = <examplesVM.Example> args.context;

    var vm = new examplePageVM.ExamplePageViewModel(example);
    page.bindingContext = vm;
    loadExample(page, example);
}

export function navigateBack(args: gestures.GestureEventData) {
    navigator.navigateBack();
}


export function toggleInfo(args: observable.EventData) {
    var page = <pages.Page>view.getAncestor(<view.View>args.object, "Page");
    switchViews(page, true);
}


export function selectExample(args: gestures.GestureEventData) {
    var page = <pages.Page>view.getAncestor(args.view, "Page");

    var selectedExample = <examplesVM.Example> args.view.bindingContext;
    var vm = <examplePageVM.ExamplePageViewModel>page.bindingContext;

    var currentSelectedExample = vm.get("currentExample");


    vm.set("currentExample", selectedExample);
    loadExample(page, selectedExample);

    switchViews(page, false);
}

function switchViews(page: pages.Page, switchToInfo: boolean) {
    var singleConainer = page.getViewById(exampleViewID);
    var groupContainer = page.getViewById(infoViewID);

    var duaration = 150;
    var anim: Array<animations.AnimationDefinition>;
    if (switchToInfo) {
        anim = [
            { target: singleConainer, opacity: 0, duration: duaration },
            { target: groupContainer, opacity: 1, duration: duaration },
        ];
    }
    else {
        anim = [
            { target: groupContainer, opacity: 0, duration: duaration },
            { target: singleConainer, opacity: 1, duration: duaration },
        ];
    }

    groupContainer.visibility = "visible";
    singleConainer.visibility = "visible";
    new animations.Animation(anim, true).play().finished.then(() => {
        groupContainer.visibility = switchToInfo ? "visible" : "collapsed";
        singleConainer.visibility = switchToInfo ? "collapsed" : "visible";
    });
}

function loadExample(page: pages.Page, example: examplesVM.Example) {
    console.log("Loading example: " + example.title);
    var container = <grid.GridLayout>page.getViewById(exampleContainerID);
    var currentExample = container.getChildAt(0);
    if (currentExample) {
        console.log("Removing previous example from container");

        container.removeChild(currentExample)
    }

    if (example.path) {
        var newExample = builder.load({
            path: example.path,
            name: ""
        });
        container.addChild(newExample);
    }
    else {
        var msg = "Example '" + example.title + "' has no path defined.";
        console.log(msg);
        var lbl = new label.Label();
        lbl.text = msg;
        container.addChild(lbl);
    }
}