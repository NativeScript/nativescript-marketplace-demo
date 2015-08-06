import examplesVM = require("./examples-view-model");
import observable = require("data/observable");

export class MainPageViewModel extends observable.Observable {
	private _selectedScreen: number = 0;
	get selectedScreen(): number {
		return this._selectedScreen;
	}
	set selectedScreen(value: number) {
		console.log("selectedScreen: " + value);
		this._selectedScreen = value;
	}

	get exampleGroups(): Array<examplesVM.ExampleGroup> {
		return examplesVM.exampleGroups;
	}

	get featuredExamples(): Array<examplesVM.Example> {
		return examplesVM.featuredExamples;
	}
}

export var instance = new MainPageViewModel();