import frame = require("ui/frame");
import observable = require("data/observable");
import platform = require("platform");
import application = require("application")
import detailPage = require("./detail-page")
import mainPage = require("./main-page");
import pages = require("Page");

var viewModel;

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
}

export function pageNavigatedTo(args: observable.EventData) {
    var page = <pages.Page>args.object;
    page.bindingContext = page.navigationContext;

}

export function navigateBack(args: observable.EventData) {
    console.log("go back ")
    frame.goBack();
}
