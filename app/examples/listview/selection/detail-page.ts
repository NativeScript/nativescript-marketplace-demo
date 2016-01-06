import frame = require("ui/frame");
import observable = require("data/observable");
import platform = require("platform");
import application = require("application")
import detailPage = require("./detail-page")
import mainPage = require("./main-page");
import pages = require("Page");
import viewModelModule = require("./main-page-model");

var viewModel: viewModelModule.ListView_ViewModel;

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: observable.EventData) {
}

export function pageNavigatedTo(args: observable.EventData) {
    var page = <pages.Page>args.object;
    viewModel = page.navigationContext;
    page.bindingContext = viewModel.CurrentItem;

}

export function onBackImageTap(args: observable.EventData) {
    frame.goBack();
}

export function onAddToFavouritesTap(args:any){
    viewModel.onTap_SetAsFavourite(args);
}

export function onDeleteTap(args:any){
    viewModel.onTap_DeletePost(args);
    frame.goBack();
}
