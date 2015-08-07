import observable = require("data/observable");
import examplesVM = require("./examples-model");

class ExampleViewModel extends observable.Observable implements examplesVM.Example {
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

	get controls(): Array<string> {
		return this._example.controls;
	}
}

export class ExamplePageViewModel extends observable.Observable {

	constructor(example: examplesVM.Example, controls: Array<string>) {
		super();

		if (!example) {
			throw new Error("Cannot create view model with no example");
		}

		this._examples = examplesVM.filterExamples(controls).map<ExampleViewModel>((e) => {
			var exVM = new ExampleViewModel(e);
			if (e === example) {
				exVM.isSelected = true;
				this._currentExample = exVM;
			}
			return exVM;
		})
	}

	private _currentExample: ExampleViewModel;
	get currentExample(): ExampleViewModel {
		return this._currentExample;
	}
	set currentExample(value: ExampleViewModel) {
		if (value !== this._currentExample) {
			if (this._currentExample) {
				this._currentExample.set("isSelected", false);
			}

			this._currentExample = value;

			if (this._currentExample) {
				this._currentExample.set("isSelected", true);
			}
		}
	}

	private _examples: Array<ExampleViewModel>;
	get examples(): Array<ExampleViewModel> {
		return this._examples;
	}
}
