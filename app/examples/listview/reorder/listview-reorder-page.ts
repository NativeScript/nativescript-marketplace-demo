import * as model from "./listview-reorder-model";
import * as listViewModule from "nativescript-ui-listview";
import * as viewModule from 'tns-core-modules/ui/core/view';
import * as utils from "tns-core-modules/utils/utils";
import * as application from "tns-core-modules/application";
import * as navigator from "../../../common/navigator";

let viewModel = new model.ListViewReorderModel();
let todoList;
let reorderedItem;
var leftThresholdPassed = false;
var rightThresholdPassed = false;

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
    let itemView = args.swipeView;
    let mainView = args.mainView;
    let currentView;

    if (args.data.x >= 0) {
        currentView = itemView.getViewById("complete-view");
        var dimensions = viewModule.View.measureChild(
            <viewModule.View>currentView.parent,
            currentView,
            utils.layout.makeMeasureSpec(Math.abs(args.data.x), utils.layout.EXACTLY),
            utils.layout.makeMeasureSpec(itemView.getMeasuredHeight(), utils.layout.EXACTLY));
        viewModule.View.layoutChild(<viewModule.View>currentView.parent, currentView, 0, 0, dimensions.measuredWidth, dimensions.measuredHeight);
        if (args.data.x > mainView.getMeasuredWidth() / 3) {
            rightThresholdPassed = false;
            leftThresholdPassed = true;
        }
    } else {
        currentView = itemView.getViewById("delete-view");
        var dimensions = viewModule.View.measureChild(
            <viewModule.View>currentView.parent,
            currentView,
            utils.layout.makeMeasureSpec(Math.abs(args.data.x), utils.layout.EXACTLY),
            utils.layout.makeMeasureSpec(mainView.getMeasuredHeight(), utils.layout.EXACTLY));
        viewModule.View.layoutChild(<viewModule.View>currentView.parent, currentView, mainView.getMeasuredWidth() - dimensions.measuredWidth, 0, mainView.getMeasuredWidth(), dimensions.measuredHeight);
        if (Math.abs(args.data.x) > mainView.getMeasuredWidth() / 3) {
            leftThresholdPassed = false;
            rightThresholdPassed = true;
        }
    }
}

export function onItemSwipeProgressEnded(args: listViewModule.ListViewEventData) {
    if (rightThresholdPassed) {
        viewModel.todoItems.splice(args.index, 1);
    } else if (leftThresholdPassed) {
        let completedItem: model.ListItem = <model.ListItem>viewModel.todoItems.getItem(args.index);
        completedItem.isDone = !completedItem.isDone;
    }
    leftThresholdPassed = false;
    rightThresholdPassed = false;
}

export function goBack(args) {
    navigator.navigateBackFromExample();
}
