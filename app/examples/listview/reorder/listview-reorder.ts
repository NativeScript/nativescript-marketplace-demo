import * as model from "./listview-reorder-model";
import * as listViewModule from "nativescript-telerik-ui-pro/listview";
import * as viewModule from 'ui/core/view';
import * as utils from "utils/utils";
import * as application from "application";
import * as navigator from "../../../common/navigator";

let viewModel = new model.ListViewReorderModel();
let todoList;
let reorderedItem;

export function pageNavigatingTo(args: any) {
    let page = args.object;
    if (viewModel === undefined) {
        viewModel = new model.ListViewReorderModel();
    }
    page.bindingContext = viewModel;
    todoList = page.getViewById("todo-list");
}

export function pageNavigatedFrom(args: any) {
    if (args.isBackNavigation) {
        viewModel = undefined;
    }
}

export function onItemSwipeProgressStarted(args: listViewModule.ListViewEventData) {
    args.data.swipeLimits.threshold = todoList.getMeasuredWidth() * utils.layout.getDisplayDensity();
    args.data.swipeLimits.left = 350 * utils.layout.getDisplayDensity();
    args.data.swipeLimits.right = 350 * utils.layout.getDisplayDensity();
}

export function onItemSwipeProgressChanged(args: any) {
    let itemView = args.object;
    let currentView;

    if (args.data.x >= 0) {
        currentView = itemView.getViewById("complete-view");
        let dimensions = viewModule.View.measureChild(currentView.parent, currentView, utils.layout.makeMeasureSpec(args.data.x, utils.layout.EXACTLY), utils.layout.makeMeasureSpec(currentView.getMeasuredHeight(), utils.layout.EXACTLY));
        viewModule.View.layoutChild(currentView.parent, currentView, 0, 0, dimensions.measuredWidth, dimensions.measuredHeight);

    } else {
        currentView = itemView.getViewById("delete-view");

        let dimensions = viewModule.View.measureChild(currentView.parent, currentView, utils.layout.makeMeasureSpec(Math.abs(args.data.x), utils.layout.EXACTLY), utils.layout.makeMeasureSpec(currentView.getMeasuredHeight(), utils.layout.EXACTLY));
        viewModule.View.layoutChild(currentView.parent, currentView, itemView.getMeasuredWidth() - dimensions.measuredWidth, 0, itemView.getMeasuredWidth(), dimensions.measuredHeight);
    }
}

export function onItemSwipeProgressEnded(args: listViewModule.ListViewEventData) {
    if ((args.data.x * utils.layout.getDisplayDensity()) < -args.data.swipeLimits.threshold / 5) {
        viewModel.todoItems.splice(args.index, 1);
    } else if ((args.data.x * utils.layout.getDisplayDensity()) > args.data.swipeLimits.threshold / 5) {
        let completedItem: model.ListItem = <model.ListItem>viewModel.todoItems.getItem(args.index);
        completedItem.isDone = !completedItem.isDone;
        console.log("TODO DONE: " + completedItem.isDone);
    }
}

export function goBack(args) {
    navigator.navigateBackFromExample();
}
