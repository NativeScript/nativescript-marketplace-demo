import model = require("./listview-reorder-model");
import listViewModule = require("nativescript-telerik-ui/listview");
import viewModule = require('ui/core/view');

var viewModel = new model.ListViewReorderModel();
var todoList;
var shoppingList;

export function onPageLoaded(args: any){
	var page = args.object;
	page.bindingContext = viewModel;
	todoList = page.getViewById("todo-list");
	shoppingList = page.getViewById("shopping-list");
}

export function onBtnTodoTap(args: any){
	shoppingList.visibility = "collapsed";
	todoList.visibility = "visible";
}

export function onBtnShoppingTap(args: any){
	shoppingList.visibility = "visible";
	todoList.visibility = "collapsed";
}