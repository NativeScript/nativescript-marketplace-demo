import observable = require("data/observable");
import pages = require("../example-base-page");


// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
    // Get the event sender
    var page = <pages.ExamplePage>args.object;
    page.bindingContext = new observable.Observable({
		username: "Joe",
		email: "joe@telerik.com",
		password: "",
		bio: "Joe's life started, when he found NativeScript ...",
		isPublic: true
	})
}

export function doneTapped(args) {
    console.log("Done tapped!");
}

export function cancelTapped(args) {
    console.log("Cancel tapped!");
}
