import {Observable} from 'data/observable';
import {ObservableArray} from 'data/observable-array';

export class ListItem extends Observable {

    constructor(title: string, isDone: boolean, isDeleted: boolean) {
        super();
        this.set("_title", title);
        this.set("_isDone", isDone);
        this.set("_isDeleted", isDeleted);
        this.set("_isReordered", false);
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

    get isReordered(){
        return this.get("_isReordered");
    }

    set isReordered(value: boolean) {
        this.set("_isReordered", value);
    }
}

export class ListViewReorderModel extends Observable{

    private _todoItems: ObservableArray<ListItem>;

    constructor() {
        super();
        this._todoItems = new ObservableArray<ListItem>();
        this.preparePictures();
    }

    get todoItems(): ObservableArray<ListItem> {
        return this._todoItems;
    }

    private preparePictures() {
        this._todoItems.push(new ListItem("Call Brian Ingram regarding the hotel reservations", false, false));
        this._todoItems.push(new ListItem("See weather forecast for London", true, false));
        this._todoItems.push(new ListItem("Prepare the children's documents", false, false));
        this._todoItems.push(new ListItem("Check the Paris - London trains schedule", true, false));
        this._todoItems.push(new ListItem("Ask Jonah if he will take care of the dog", false, false));
        this._todoItems.push(new ListItem("Reschedule airplane tickets for the next month's flight to Hawaii", false, false));
        this._todoItems.push(new ListItem("Bills due: Alissa's ballet class fee", false, false));
        this._todoItems.push(new ListItem("Get Alisse from school", false, false));
        this._todoItems.push(new ListItem("Call Jessie", false, false));
        this._todoItems.push(new ListItem("Pay Electricity Bill", false, false));
        this._todoItems.push(new ListItem("Check out the restaurant", false, false));

    }

    public onItemReorderStarted(args:any){
        let todoItem = this.todoItems.getItem(args.itemIndex);
        todoItem.isReordered = true;
    }

    public onItemReordered(args:any){
        let todoItem = this.todoItems.getItem(args.data.targetIndex);
        todoItem.isReordered = false;
    }
}