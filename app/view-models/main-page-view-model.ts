import examplesVM = require("./examples-model");
import observable = require("data/observable");
import paltfrom = require("platform");

export class MainPageViewModel extends observable.Observable {
	get exampleGroups(): Array<examplesVM.ExampleGroup> {
		return examplesVM.groups;
	}

	get featuredExamples(): Array<examplesVM.Example> {
		return examplesVM.featuredExamples;
	}

	constructor() {
		super();
		this.set("showOnlyNew", false);
		this.set("selectedScreen", 0);
        this.set("useListLayout", false);
	}

    public toggleShowNew() {
        this.set("showOnlyNew", !this.get("showOnlyNew"));
    }

    public toggleWrapLayout(){
        console.log("toggleWrapLayout");
        this.set("useListLayout", !this.get("useListLayout"));
    }

    get screenWidth(): number {
		return paltfrom.screen.mainScreen.widthDIPs;
	}
}

export var instance = new MainPageViewModel();
