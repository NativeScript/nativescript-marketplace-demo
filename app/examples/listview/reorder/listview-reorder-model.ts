import {Observable} from 'data/observable';
import {ObservableArray} from 'data/observable-array';

export class ListItem extends Observable {

	constructor(title: string, isDone: boolean, isDeleted: boolean) {
		super();
		this.set("_title", title);
		this.set("_isDone", isDone);
		this.set("_isDeleted", isDeleted);
	}

	get title() {
		return this.get("_title");
	}

	set title(value: string) {
		this.set("_title", value);
	}

	get isDone() {
		return this.get("_isDone");
	}

	set isDone(value: boolean) {
			this.set("_isDone", value);
	}

	get isDeleted() {
		return this.get("_isDeleted");
	}

	set isDeleted(value: boolean) {
		this.set("_isDeleted", value);
	}
}

export class ListViewReorderModel extends Observable{

	private _todoItems: ObservableArray<ListItem>;
	private _shoppingList: ObservableArray<ListItem>;
	
	get viewMode() {
        return this.get("currentMode");
    }

    set viewMode(value) {
        this.set("currentMode", value);
    }
		
	constructor() {
		super();
		this._todoItems = new ObservableArray<ListItem>();
		this._shoppingList = new ObservableArray<ListItem>();
		this.preparePictures();
	}

	get todoItems(): ObservableArray<ListItem> {
		return this._todoItems;
	}

	get shoppingItems(): ObservableArray<ListItem> {
		return this._shoppingList;
	}

	private preparePictures() {
		this._todoItems.push(new ListItem("Call Brian Ingram regarding the hotel reservations", false, false));
		this._todoItems.push(new ListItem("See weather forecast for London", true, false));
		this._todoItems.push(new ListItem("Prepare the children's documents", false, false));
		this._todoItems.push(new ListItem("Check the Paris - London trains schedule", true, false));
		this._todoItems.push(new ListItem("Ask Jonah if he will take care of the dog", false, false));
		this._todoItems.push(new ListItem("Reschedule airplane tickets for the next month's flight to Hawaii", false, false));
		this._todoItems.push(new ListItem("Bills due: Alissa's ballet class fee", false, false));

		this._shoppingList.push(new ListItem("Milk", false, false));
		this._shoppingList.push(new ListItem("Salmon", true, false));
		this._shoppingList.push(new ListItem("Eggs", false, false));
		this._shoppingList.push(new ListItem("Almonds", true, false));
		this._shoppingList.push(new ListItem("Chicken", false, false));
		this._shoppingList.push(new ListItem("Beef", false, false));
		this._shoppingList.push(new ListItem("Yogurt", false, false));
		this._shoppingList.push(new ListItem("Spinach", false, false));
		this._shoppingList.push(new ListItem("Carrots", true, false));
		this._shoppingList.push(new ListItem("Apples", false, false));
		this._shoppingList.push(new ListItem("Tomatoes", true, false));
	}
}