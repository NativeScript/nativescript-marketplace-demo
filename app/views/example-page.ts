import pages = require("ui/page");
import view = require("ui/core/view");
import gestures = require("ui/gestures");
import observable = require("data/observable");
import navigator = require("../common/navigator");
import animations = require("ui/animation");
import examplesVM = require("../view-models/examples-view-model")
import examplePageVM = require("../view-models/example-page-view-model")

var singleContainerID = "sigle-example-container";
var groupContainerID = "example-group-container";

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
    var singleConainer = page.getViewById(singleContainerID);
    var groupContainer = page.getViewById(groupContainerID);

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
    new animations.Animation(anim, true).play();
}

function loadExample(page: pages.Page, example: examplesVM.Example) {
    console.log("loading example: " + example.title);
}