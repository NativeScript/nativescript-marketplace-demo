import pages = require("ui/page");
import view = require("ui/core/view");
import gestures = require("ui/gestures");
import navigator = require("../common/navigator");
import examplesVM = require("../view-models/examples-model")
import codePageVM = require("../view-models/code-page-view-model")
import dialogs = require("ui/dialogs");
import observable = require("data/observable");

// Event handler for Page "navigatedTo" event attached in details-page.xml
export function pageNavigatedTo(args: pages.NavigatedData) {
    // Get the event sender
    var page = <pages.Page>args.object;
    page.bindingContext = new codePageVM.CodePageViewModel(args.context);
}

export function selectFile(args: observable.EventData) {
    var vm = <codePageVM.CodePageViewModel>(<view.View>args.object).bindingContext;
    var options = vm.files.map((file) => file.name);

    dialogs.action({
        cancelButtonText: "Cancel",
        actions: vm.files.map((file) => file.name),
    }).then((selectedFile) => {
        vm.selectFile(selectedFile);
    }, (error) => {
        console.log("Error selecting file: " + error);
    });
}

export function navigateBack(args: gestures.GestureEventData) {
    navigator.navigateBack();
}