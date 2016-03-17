import model = require("./listview-reorder-model");
import listViewModule = require("nativescript-telerik-ui-pro/listview");
import viewModule = require('ui/core/view');
import utils = require("utils/utils");
import application = require("application");
import * as navigator from "../../../common/navigator";

var viewModel = new model.ListViewReorderModel();
var todoList;
var shoppingList;

var reorderedItem;

export function pageNavigatingTo(args: any) {
    var page = args.object;
    if (viewModel === undefined) {
        viewModel = new model.ListViewReorderModel();
    }
    page.bindingContext = viewModel;
    todoList = page.getViewById("todo-list");
    shoppingList = page.getViewById("shopping-list");
    viewModel.viewMode = "Todo";

    if (application.android) {
        var window = application.android.foregroundActivity.getWindow();
        if (android.os.Build.VERSION.SDK_INT > 18) {
            window.clearFlags(android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            console.log("Adding flags");
        }

        if (android.os.Build.VERSION.SDK_INT >= 21) {
            window.addFlags(android.view.WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(android.graphics.Color.BLACK);
        }
    }
}

export function pageNavigatedFrom(args: any) {

    if (args.isBackNavigation) {
        viewModel = undefined;
    }

    if (application.android) {
        var window = application.android.foregroundActivity.getWindow();
        if (android.os.Build.VERSION.SDK_INT > 18) {
            window.addFlags(android.view.WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        }

        if (android.os.Build.VERSION.SDK_INT >= 21) {
            window.clearFlags(android.view.WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        }
    }
}

export function onBtnTodoTap(args: any) {
    if (viewModel.viewMode !== "Todo") {
        shoppingList.visibility = "collapsed";
        todoList.visibility = "visible";
        viewModel.viewMode = "Todo";
    }
}

export function onBtnShoppingTap(args: any) {
    if (viewModel.viewMode !== "Shopping") {
        shoppingList.visibility = "visible";
        todoList.visibility = "collapsed";
        viewModel.viewMode = "Shopping";
    }
}

export function onItemSwipeProgressChanged(args: any) {
    var itemView = args.object;
    var currentView;

    if (args.data.x >= 0) {
        currentView = itemView.getViewById("complete-view");
        var dimensions = viewModule.View.measureChild(currentView.parent, currentView, utils.layout.makeMeasureSpec(args.data.x, utils.layout.EXACTLY), utils.layout.makeMeasureSpec(currentView.getMeasuredHeight(), utils.layout.EXACTLY));
        viewModule.View.layoutChild(currentView.parent, currentView, 0, 0, dimensions.measuredWidth, dimensions.measuredHeight);

    } else {
        currentView = itemView.getViewById("delete-view");

        var dimensions = viewModule.View.measureChild(currentView.parent, currentView, utils.layout.makeMeasureSpec(Math.abs(args.data.x), utils.layout.EXACTLY), utils.layout.makeMeasureSpec(currentView.getMeasuredHeight(), utils.layout.EXACTLY));
        viewModule.View.layoutChild(currentView.parent, currentView, itemView.getMeasuredWidth() - dimensions.measuredWidth, 0, itemView.getMeasuredWidth(), dimensions.measuredHeight);
    }
}

export function onTodoItemSwipeProgressEnded(args: listViewModule.ListViewEventData) {
    if ((args.data.x * utils.layout.getDisplayDensity()) < -args.data.swipeLimits.threshold / 5) {
        viewModel.todoItems.splice(args.itemIndex, 1);
    } else if ((args.data.x * utils.layout.getDisplayDensity()) > args.data.swipeLimits.threshold / 5) {
        var completedItem: model.ListItem = <model.ListItem>viewModel.todoItems.getItem(args.itemIndex);
        completedItem.isDone = !completedItem.isDone;
        console.log("TODO DONE: " + completedItem.isDone);
    }
}

export function onShoppingItemSwipeProgressEnded(args: listViewModule.ListViewEventData) {
    if ((args.data.x * utils.layout.getDisplayDensity()) < -args.data.swipeLimits.threshold / 5) {
        viewModel.shoppingItems.splice(args.itemIndex, 1);
    } else if ((args.data.x * utils.layout.getDisplayDensity()) > args.data.swipeLimits.threshold / 5) {
        var completedItem: model.ListItem = <model.ListItem>viewModel.shoppingItems.getItem(args.itemIndex);
        completedItem.isDone = !completedItem.isDone;
        console.log("SHOPPING DONE: " + completedItem.isDone);
    }
}

export function onItemSwipeProgressStarted(args: listViewModule.ListViewEventData) {
    args.data.swipeLimits.threshold = todoList.getMeasuredWidth() * utils.layout.getDisplayDensity();
    args.data.swipeLimits.left = 350 * utils.layout.getDisplayDensity();
    args.data.swipeLimits.right = 350 * utils.layout.getDisplayDensity();
}

export function goBack(args) {
    navigator.navigateBackFromExample();
}
