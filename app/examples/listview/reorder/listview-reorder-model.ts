import {Observable} from 'data/observable';

export class ListItem extends Observable {
	private _title: string;
	private _isDone: boolean;
	private _isDeleted: boolean;

	constructor(title: string, isDone: boolean, isDeleted: boolean) {
		super();
		this._title = title;
		this._isDone = isDone;
		this._isDeleted = isDeleted;
	}

	get title() {
		return this._title;
	}

	set title(value: string) {
		this._title = value;
	}

	get isDone() {
		return this._isDone;
	}

	set isDone(value: boolean) {
		this._isDone = value;
	}

	get isDeleted() {
		return this._isDeleted;
	}

	set isDeleted(value: boolean) {
		this._isDeleted = value;
	}
}

export class ListViewReorderModel {

	private _todoItems: Array<ListItem>;
	private _shoppingList: Array<ListItem>;

	constructor() {
		this._todoItems = new Array<ListItem>();
		this._shoppingList = new Array<ListItem>();
		this.preparePictures();
	}

	get todoItems(): Array<any> {
		return this._todoItems;
	}

	get shoppingItems(): Array<any> {
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