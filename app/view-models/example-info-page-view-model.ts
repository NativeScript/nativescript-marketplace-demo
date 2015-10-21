import observable = require("data/observable");
import examplesVM = require("./examples-model");

export class ExampleViewModel extends observable.Observable implements examplesVM.Example {
    isSelected: boolean;
    constructor(private _example: examplesVM.Example) {
        super();
    }

    get title(): string {
        return this._example.title;
    }

    get info(): string {
        return this._example.info;
    }

    get image(): string {
        return this._example.image;
    }

    get isFeatured(): boolean {
        return this._example.isFeatured;
    }

    get isNew(): boolean {
        return this._example.isNew;
    }

    get path(): string {
        return this._example.path;
    }

    get group(): examplesVM.ExampleGroup {
        return this._example.group;
    }

    get controls(): string {
        return this._example.controls;
    }
}

export class ExampleInfoPageViewModel extends observable.Observable {

    private _examples: ExampleViewModel[];
    private _group: examplesVM.ExampleGroup;

    constructor(example: examplesVM.Example) {
        super();

        if (!example) {
            throw new Error("Cannot create view model with no example");
        }

        var examplesWrappers = example.group.examples.map<ExampleViewModel>((e) => {
            var exVM = new ExampleViewModel(e);
            if (e === example) {
                this._currentExample = exVM;
            }
            return exVM;
        })

        this._examples = examplesWrappers;
        this._group = example.group;
    }

    get examples(): ExampleViewModel[] {
        return this._examples;
    }

    get group(): examplesVM.ExampleGroup {
        return this._group;
    }

    private _currentExample: ExampleViewModel;
    get currentExample(): ExampleViewModel {
        return this._currentExample;
    }
    set currentExample(value: ExampleViewModel) {
        if (value !== this._currentExample) {
            this._currentExample = value;
            this.notifyPropertyChange("currentExample", value);
        }
    }

    public currentExampleView: any;
}

export interface ExampleNavigationContext {
    shouldNavigateToInfoOnBack: boolean;
    example: examplesVM.Example;
}