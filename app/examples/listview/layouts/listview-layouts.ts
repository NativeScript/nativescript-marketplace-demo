import model = require("./layouts-view-model");
import listViewModule = require("nativescript-telerik-ui/listview");

var viewModel: model.ListViewLayoutsModel = new model.ListViewLayoutsModel();
var listView;

export function onPageLoaded(args: any){
	var page = args.object;
	page.actionBar.navigationButton = undefined;
	page.bindingContext = viewModel;
	listView = page.getViewById("list-view");
	viewModel.isLinearActive = true;
	viewModel.isWrapActive = false;
}

export function onLinearLayoutTap(args: any){
	var linearLayout = new listViewModule.ListViewLinearLayout();
	listView.listViewLayout = linearLayout; 
	viewModel.isLinearActive = true;
	viewModel.isWrapActive = false;
}

export function onGridLayoutTap(args: any){
	var gridLayout = new listViewModule.ListViewGridLayout();
	gridLayout.spanCount = 2;
	gridLayout.itemHeight="250";
	listView.listViewLayout = gridLayout;
	viewModel.isLinearActive = false;
	viewModel.isWrapActive = true; 
}