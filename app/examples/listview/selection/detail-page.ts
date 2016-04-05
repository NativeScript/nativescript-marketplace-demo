import { SelectionViewModel, BlogPostItemData } from "./selection-view-model";
import { EventData } from "data/observable";
import { Page, NavigatedData } from "ui/page";
import { View } from "ui/core/view";
import { topmost as topmostFrame } from "ui/frame";
import * as navigator from "../../../common/navigator";

export function pageNavigatedTo(args: NavigatedData) {
    var page = <Page>args.object;
    var item = <BlogPostItemData>args.context;
    page.bindingContext = item;
}

export function onToggleFavouriteTap(args: EventData){
    var page = <Page>(<View>args.object).page;
    var item = <BlogPostItemData>page.bindingContext;
    navigator.navigateBackWithContext({ action: "favorite", item: item });
}

export function onDeleteTap(args: EventData){
    var page = <Page>(<View>args.object).page;
    var item = <BlogPostItemData>page.bindingContext;
    navigator.navigateBackWithContext({ action: "delete", item: item });
}

export function goBack(args: EventData) {
    navigator.navigateBack();
}

