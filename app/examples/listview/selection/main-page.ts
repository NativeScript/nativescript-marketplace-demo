import mainPageModule = require("./main-page-model");
import pageModule = require("ui/page");
import lvModule = require("nativescript-telerik-ui/listview");
import frame = require("ui/frame");
import pages = require("ui/page");

export var listView: lvModule.ListView;
var viewModel;

export function pageNavigatingTo(args) {
    var page = <pageModule.Page>args.object;
    page.bindingContext = viewModel = new mainPageModule.ListView_ViewModel();

    listView = page.getViewById("theListView");
}

export function onPageUnloaded(args){
    listView = undefined;
    viewModel = undefined;
}
