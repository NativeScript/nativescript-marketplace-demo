import examplesVM = require("./examples-model");
import observable = require("data/observable");

export class GroupPageViewModel extends observable.Observable {
    public group: examplesVM.ExampleGroup;
    public examples: Array<examplesVM.Example>;
    public isSingleControl: boolean;

    constructor(group: examplesVM.ExampleGroup, isSingleControl: boolean) {
        super();

        this.set("examples", examplesVM.filterExamples(group.controls));
        this.set("group", group);
        this.set("isSingleControl", isSingleControl);
    }
}

export function getGroupForControl(control: string): GroupPageViewModel {
    var exampleGroup = <examplesVM.ExampleGroup>{ title: capitalize(control), isNew: false, controls: [control] };
    return new GroupPageViewModel(exampleGroup, true);
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}