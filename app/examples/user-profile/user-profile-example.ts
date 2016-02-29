import observable = require("data/observable");
import pages = require("../example-base-page");
import platform = require("platform");
import application = require("application")

var viewModel;
var lastInput = undefined;

// Event handler for Page "loaded" event attached in main-page.xml
export function pageNavigatingTo(args: observable.EventData) {
    // Get the event sender
    var page = <pages.ExamplePage>args.object;
    viewModel = new observable.Observable({
        username: "Joe",
        email: "joe@telerik.com",
        password: "password",
        bio: "Joe's life started, when he found NativeScript ...",
        isPublic: true,
        showPassword: false
    });
    page.bindingContext = viewModel;

    lastInput = undefined;
}

export function doneTapped(args) {
    showToast("Done Tapped!");
}

export function cancelTapped(args) {
    showToast("Cancel Tapped!");
}

export function changeImageTapped(args) {
    showToast("Change Image Tapped!");
}

function showToast(msg: string) {
    console.log(msg);
    
    if (platform.device.os === platform.platformNames.android) {
        var toast = (<any>android).widget.Toast;
        var toast = toast.makeText(application.android.context, msg, toast.LENGTH_SHORT);
        toast.show();
    }
}

export function toggleShowPassword(args: observable.EventData) {
    viewModel.showPassword = !viewModel.showPassword;
}

var closeTimeout = false;

export function inputTap(args) {
    lastInput = args.object;
    if (closeTimeout) {
        clearTimeout(closeTimeout);
    }
    closeTimeout = setTimeout(() => {
        closeTimeout = false;
    }, 20);
}

export function tap(args) {
    var page = args.object.page;
    if (!closeTimeout) {
        closeTimeout = setTimeout(() => {
            page.getViewById("username").dismissSoftInput();
            page.getViewById("email").dismissSoftInput();
            page.getViewById("password").dismissSoftInput();
            page.getViewById("bio").dismissSoftInput();
            closeTimeout = false;
        }, 20);
    }
}