import * as pages from "ui/page";
import * as view from "ui/core/view";
import * as gestures from "ui/gestures";
import * as navigator from "../common/navigator";
import * as examplesVM from "../view-models/examples-model"
import * as codePageVM from "../view-models/code-page-view-model"
import * as dialogs from "ui/dialogs";
import * as observable from "data/observable";

// Event handler for Page "navigatedTo" event attached in details-page.xml
export function pageNavigatingTo(args: pages.NavigatedData) {
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

export function goBack(args: gestures.GestureEventData) {
    navigator.navigateBack();
}