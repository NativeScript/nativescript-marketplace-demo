import model = require("./listview-reorder-model");
import listViewModule = require("nativescript-telerik-ui/listview");
import viewModule = require('ui/core/view');
import utils = require("utils/utils");

var viewModel = new model.ListViewReorderModel();
var todoList;
var shoppingList;

export function onPageLoaded(args: any) {
	var page = args.object;
	page.bindingContext = viewModel;
	todoList = page.getViewById("todo-list");
	shoppingList = page.getViewById("shopping-list");
}

export function onBtnTodoTap(args: any) {
	shoppingList.visibility = "collapsed";
	todoList.visibility = "visible";
}

export function onBtnShoppingTap(args: any) {
	shoppingList.visibility = "visible";
	todoList.visibility = "collapsed";
}

export function onTodoItemSwipeProgressChanged(args: any) {
	var itemView = args.object;
	var currentView;
	if (args.data.x >= 0) {
		currentView = itemView.getViewById("complete-view");
		currentView.width = args.data.x;
		var dimensions = viewModule.View.measureChild(currentView.parent, currentView, utils.layout.makeMeasureSpec(args.data.x, utils.layout.EXACTLY), utils.layout.makeMeasureSpec(currentView.getMeasuredHeight(), utils.layout.EXACTLY));
		viewModule.View.layoutChild(currentView.parent, currentView, 0, 0, dimensions.measuredWidth, dimensions.measuredHeight);
	} else {
		// currentView = itemView.getViewById("delete-view");
		// currentView.width = 150;
		// var dimensions = viewModule.View.measureChild(currentView.parent, currentView, utils.layout.makeMeasureSpec(150, utils.layout.EXACTLY), utils.layout.makeMeasureSpec(currentView.getMeasuredHeight(), utils.layout.EXACTLY));
		// console.log("measuredWidth " + itemView.getMeasuredWidth() + args.data.x);
		// viewModule.View.layoutChild(currentView.parent, currentView, itemView.getMeasuredWidth() - 150, 0, dimensions.measuredWidth, dimensions.measuredHeight);
	}
}

export function onTodoItemSwipeProgressEnded(args: any) {
	if (args.data.x < 0) {
		console.log("Item deleted");
		viewModel.todoItems.splice(args.itemIndex, 1);
	} else if (args.data.x > 0) {
		console.log("Item completed");
		var completedItem: model.ListItem = <model.ListItem>viewModel.todoItems.getItem(args.itemIndex);
		completedItem.isDone = true;
	}
}

export function onShoppingItemSwipeProgressEnded(args: any) {
	if (args.data.x < 0) {
		console.log("Item deleted");
		viewModel.shoppingItems.splice(args.itemIndex, 1);
	} else if (args.data.x > 0) {
		console.log("Item completed");
		var completedItem: model.ListItem = <model.ListItem>viewModel.shoppingItems.getItem(args.itemIndex);
		completedItem.isDone = true;
	}
}

export function onItemSwipeProgressStarted(args: any) {
	args.data.swipeLimits.threshold = args.object.getMeasuredWidth();
}