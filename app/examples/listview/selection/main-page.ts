import { EventData } from "data/observable";
import { Page, NavigatedData } from "ui/page";
import { View } from "ui/core/view";
import { RadListView } from "nativescript-telerik-ui-pro/listview";
import { SelectionViewModel, BlogPostItemData } from "./selection-view-model";
import * as navigator from "../../../common/navigator";
import * as platform from "platform";
import { topmost as topmostFrame } from "ui/frame";

export function listViewLoaded(args: EventData) {
    var listView = <RadListView>args.object;
    var page = <Page>(<View>args.object).page;
    if (!page.bindingContext) {
        page.bindingContext = new SelectionViewModel(listView); 
    }
}

// Returning from the details-page
export function pageNavigatedTo(args: NavigatedData) {
    var page = <Page>args.object;
    var viewModel = <SelectionViewModel>page.bindingContext;
    if (args.isBackNavigation && args.context && args.context.action && args.context.item && viewModel) {
        switch (args.context.action) {
            case "delete":
                viewModel.deleteItem(args.context.item);
                break;
            case "favorite":
                var item = <BlogPostItemData>args.context.item; 
                item.IsFavourite = !item.IsFavourite;
                break;
        }
        
        // Clear the delete/favorite context for the next time the user goes back to this page. 
        topmostFrame().currentEntry.context = null;    
    }
}

export function goBack(args: EventData) {
    var page = <Page>(<View>args.object).page;
    var viewModel = <SelectionViewModel>page.bindingContext;
    if (platform.device.os === platform.platformNames.android && viewModel && (viewModel.isSelectionActive || viewModel.isReorderActive)) {
        viewModel.exitSelectionMode();
        return;
    }

    navigator.navigateBackFromExample();
}