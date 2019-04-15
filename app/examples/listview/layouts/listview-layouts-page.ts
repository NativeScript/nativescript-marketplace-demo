import { EventData } from "tns-core-modules/data/observable";
import { Page, NavigatedData } from "tns-core-modules/ui/page";
import { View } from "tns-core-modules/ui/core/view";
import { ListViewLayoutsModel } from "./layouts-view-model";
import { RadListView, ListViewGridLayout, ListViewLinearLayout } from "nativescript-ui-listview";
import * as navigator from "../../../common/navigator";
import * as application from "tns-core-modules/application";

let GRID_LAYOUT = new ListViewGridLayout();
GRID_LAYOUT.spanCount = 2;
GRID_LAYOUT.itemHeight = 160;

let LINEAR_LAYOUT = new ListViewLinearLayout();
LINEAR_LAYOUT.itemHeight = 210;
if (LINEAR_LAYOUT.ios) {
    LINEAR_LAYOUT.ios.dynamicItemSize = false;
}

declare var android;

export function pageNavigatingTo(args: NavigatedData) {
    var page = <Page>args.object;
    page.bindingContext = new ListViewLayoutsModel();
}

export function onChangeLayoutTap(args: EventData) {
    var page = (<View>args.object).page;
    var listView = page.getViewById<RadListView>("list-view");
    var viewModel = <ListViewLayoutsModel>page.bindingContext;
    listView.listViewLayout = viewModel.isLinearActive ? GRID_LAYOUT : LINEAR_LAYOUT;
    viewModel.isLinearActive = !viewModel.isLinearActive;
}

export function goBack(args: EventData) {
    navigator.navigateBackFromExample();
}
