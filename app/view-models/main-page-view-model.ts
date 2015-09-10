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
        this.set("useWrapLayout", false);
	}
    
    public toggleShowNew() {
        this.set("showOnlyNew", !this.get("showOnlyNew"));
    }
    
    public toggleWrapLayout(){
        console.log("toggleWrapLayout");
        this.set("useWrapLayout", !this.get("useWrapLayout"));
    }
}

export var instance = new MainPageViewModel();