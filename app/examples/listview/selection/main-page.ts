import mainPageModule = require("./main-page-model");
import pageModule = require("ui/page");
import lvModule = require("nativescript-telerik-ui-pro/listview");
import frame = require("ui/frame");
import pages = require("ui/page");

export var listView: lvModule.ListView;
var viewModel;

export function pageNavigatingTo(args) {
    var page = <pageModule.Page>args.object;
    if (viewModel === undefined) {
        page.bindingContext = viewModel = new mainPageModule.ListView_ViewModel();
    } else {
        page.bindingContext = viewModel;
    }

    listView = page.getViewById("theListView");
}

export function onNavigatingFrom(args){
    if (args.isBackNavigation){
        viewModel = undefined;
    }
}

export function onPageUnloaded(args) {
    listView = undefined;
}
