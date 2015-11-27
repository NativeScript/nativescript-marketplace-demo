import model = require("./layouts-view-model");

var viewModel = new model.ListViewLayoutsModel();

export function onPageLoaded(args: any){
	var page = args.object;
	page.bindingContext = viewModel;
}