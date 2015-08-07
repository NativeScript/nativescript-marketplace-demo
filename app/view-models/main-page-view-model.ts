import examplesVM = require("./examples-model");
import observable = require("data/observable");

export class MainPageViewModel extends observable.Observable {
	get exampleGroups(): Array<examplesVM.ExampleGroup> {
		return examplesVM.exampleGroups;
	}

	get featuredExamples(): Array<examplesVM.Example> {
		return examplesVM.featuredExamples;
	}

	constructor() {
		super();
		this.set("showOnlyNew", false);
		this.set("selectedScreen", 0);
	}
}

export var instance = new MainPageViewModel();