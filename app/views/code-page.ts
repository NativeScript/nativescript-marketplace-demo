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
import codePageVM = require("../view-models/code-page-view-model")

// Event handler for Page "navigatedTo" event attached in details-page.xml
export function pageNavigatedTo(args: pages.NavigatedData) {
    // Get the event sender
    var page = <pages.Page>args.object;
    page.bindingContext = new codePageVM.CodePageViewModel(args.context);
}

export function selectFile(args: gestures.GestureEventData) {
    var vm = <codePageVM.CodePageViewModel>args.view.page.bindingContext;
    vm.selectFile(args.view.bindingContext);
}

export function navigateBack(args: gestures.GestureEventData) {
    navigator.navigateBack();
}