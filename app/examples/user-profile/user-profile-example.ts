import observable = require("data/observable");
import pages = require("../example-base-page");

var viewModel;

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    var page = <pages.ExamplePage>args.object;
    viewModel = new observable.Observable({
		    username: "Joe",
		    email: "joe@telerik.com",
		    password: "password",
		    bio: "", //Joe's life started, when he found NativeScript ...",
            isPublic: true,
            showPassword: false
    });
    page.bindingContext = viewModel;
}

export function doneTapped(args) {
    console.log("Done tapped!");
}

export function cancelTapped(args) {
    console.log("Cancel tapped!");
}

export function toggleShowPassword(args: observable.EventData) {
    viewModel.showPassword = !viewModel.showPassword;
}
