import examplesVM = require("./examples-model");
import observable = require("data/observable");
import paltfrom = require("platform");

export class GroupPageViewModel extends observable.Observable {
    public group: examplesVM.ExampleGroup;
    public examples: Array<examplesVM.Example>;

    constructor(group: examplesVM.ExampleGroup, isSingleControl: boolean) {
        super();

        this.set("examples", group.examples);
        this.set("group", group);
        this.set("useWrapLayout", true);
    }

    public toggleShowNew() {
        this.set("showOnlyNew", !this.get("showOnlyNew"));
    }

    public toggleWrapLayout() {
        this.set("useWrapLayout", !this.get("useWrapLayout"));
    }

    get screenWidth(): number {
        return paltfrom.screen.mainScreen.widthDIPs;
    }
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
