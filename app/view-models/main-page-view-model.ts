import * as examplesVM from "./examples-model";
import * as observable from "tns-core-modules/data/observable";
import * as platform from "tns-core-modules/platform";
import { viewModel } from "../common/firebase";

export class MainPageViewModel extends observable.Observable {

	get firebase() {
		return viewModel;
	}

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

		this.set("screenWidth", platform.screen.mainScreen.widthDIPs)
	}

    public toggleShowNew() {
        this.set("showOnlyNew", !this.get("showOnlyNew"));
    }

    public toggleWrapLayout(){
        console.log("toggleWrapLayout");
        this.set("useListLayout", !this.get("useListLayout"));
    }

    get screenWidth(): number {
		return platform.screen.mainScreen.widthDIPs;
	}
}

let instance;
export function getInstance() {
	return instance || (instance = new MainPageViewModel());
}
