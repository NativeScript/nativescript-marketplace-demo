import * as examplesVM from "./examples-model";
import * as observable from "data/observable";
import * as paltfrom from "platform";

export class GroupPageViewModel extends observable.Observable {
    public group: examplesVM.ExampleGroup;
    public examples: Array<examplesVM.Example>;

    constructor(group: examplesVM.ExampleGroup) {
        super();

        this.set("examples", group.examples);
        this.set("group", group);
        this.set("useListLayout", false);
    }

    public toggleShowNew() {
        this.set("showOnlyNew", !this.get("showOnlyNew"));
    }

    public toggleWrapLayout() {
        this.set("useListLayout", !this.get("useListLayout"));
    }

    get screenWidth(): number {
        return paltfrom.screen.mainScreen.widthDIPs;
    }
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
