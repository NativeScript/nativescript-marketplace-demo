import { Page, NavigatedData, EventData, View } from "tns-core-modules/ui/page";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { CodePageViewModel } from "../view-models/code-page-view-model"
import * as navigator from "../common/navigator";

// Event handler for Page "navigatedTo" event attached in details-page.xml
export function pageNavigatingTo(args: NavigatedData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new CodePageViewModel(args.context);
}

export function selectFile(args: EventData) {
    var vm = <CodePageViewModel>(<View>args.object).bindingContext;

    dialogs.action({
        cancelButtonText: "Cancel",
        actions: vm.files.map((file) => file.name),
    }).then((selectedFile) => {
        vm.selectFile(selectedFile);
    }, (error) => {
        console.log("Error selecting file: " + error);
    });
}

export function goBack() {
    navigator.navigateBack();
}