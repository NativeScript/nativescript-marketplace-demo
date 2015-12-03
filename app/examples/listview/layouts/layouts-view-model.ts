

export class PictureItem {
	private _pictureUri;
	private _pictureTitle;

	constructor(uri: string, title: string) {
		this._pictureUri = uri;
		this._pictureTitle = title;
	}

	get pictureUri() {
		return this._pictureUri;
	}

	get pictureTitle() {
		return this._pictureTitle;
	}
}

export class PictureGroup {
	private _groupKey;

	constructor(groupKey: string) {
		this._groupKey = groupKey;
	}

	get key() {
		return this._groupKey;
	}
}

export class ListViewLayoutsModel {

	private _source = [


		{ "title": "Dried Meat with Spices", "author": "Nice to Meat You", "photo": "paleo1", "category": "paleo" },
		{ "title": "Golden Chicken", "author": "Chicken's Heaven", "photo": "paleo2", "category": "paleo" },
		{ "title": "Pork Steak with Vegetables", "author": "Nice to Meat You", "photo": "paleo3", "category": "paleo" },
		{ "title": "Lamb Cotlets", "author": "Nice to Meat You", "photo": "paleo4", "category": "paleo" },
		{ "title": "Salmon Steak", "author": "Ron's Fishery", "photo": "paleo5", "category": "paleo" },
		{ "title": "These Rolls..", "author": "Le Bakery de Trevi", "photo": "dessert1", "category": "desserts" },
		{ "title": "Chocolate Cake", "author": "The Sweetest Thing", "photo": "dessert2", "category": "desserts" },
		{ "title": "Rainbow Chocolate Pudding", "author": "Sweet and Sweeter", "photo": "dessert3", "category": "desserts" },
		{ "title": "Ice-cream Sandwich", "author": "The Sweetest Thing", "photo": "dessert4", "category": "desserts" },
		{ "title": "Le Macarons de Lyon", "author": "Le Bakery de Trevi", "photo": "dessert5", "category": "desserts" },
		{ "title": "Le Tiramisu de Treviso", "author": "Sweet and Sweeter", "photo": "dessert6", "category": "desserts" },
		{ "title": "Creme Caramel", "author": "The Sweetest Thing", "photo": "dessert7", "category": "desserts" },
		{ "title": "Be Fit, Be Healthy Fruit Mix", "author": "Sweet and Sweeter", "photo": "dessert8", "category": "desserts" },
		{ "title": "Ceylon Tea", "author": "The Healthy Bar", "photo": "drink1", "category": "drinks" },
		{ "title": "Orange Juice, Fresh", "author": "The Healthy Bar", "photo": "drink2", "category": "drinks" },
		{ "title": "A Glass of Wine", "author": "Tonight's Bar", "photo": "drink3", "category": "drinks" },
		{ "title": "Barista's Masterpiece", "author": "The Cafe Near You", "photo": "drink4", "category": "drinks" },
		{ "title": "Coffee", "author": "Sweet and Sweeter", "photo": "drink5", "category": "drinks" },
		{ "title": "Watermelon Dream", "author": "The Healthy Bar", "photo": "drink6", "category": "drinks" },
		{ "title": "Mojito", "author": "Tonight's Bar", "photo": "drink7", "category": "drinks" },
		{ "title": "Raspberry Smoothie", "author": "The Healhy Bar", "photo": "drink8", "category": "drinks" },
		{ "title": "Smootie (Different Flavors)", "author": "Sweet and Sweeter", "photo": "drink9", "category": "drinks" },
		{ "title": "Soda", "author": "The Healthy Bar", "photo": "drink10", "category": "drinks" },
		{ "title": "Lemon Ice Tea", "author": "Sweet and Sweeter", "photo": "drink11", "category": "drinks" },
		{ "title": "Crystal Water with Almond Oil", "author": "The Healthy Bar", "photo": "drink12", "category": "drinks" },
		{ "title": "The Fresh Sandwich", "author": "Sandwiches and More", "photo": "breakfast1", "category": "breakfast" },
		{ "title": "The Healthy Sandwich", "author": "Sandwiches and More", "photo": "breakfast2", "category": "breakfast" },
		{ "title": "Crispy Chicken with Avocado Sandwich", "author": "Chicken's Heaven", "photo": "breakfast3", "category": "breakfast" },
		{ "title": "Beef Sandwich", "author": "Nice to Meat You", "photo": "breakfast4", "category": "breakfast" },
		{ "title": "Tuna Sandwich", "author": "Ron's Fishery", "photo": "breakfast5", "category": "breakfast" },
		{ "title": "Fruit Cake", "author": "ReFresh", "photo": "breakfast6", "category": "breakfast" },
		{ "title": "A Quick Snack Burger", "author": "Nice to Meat You", "photo": "main1", "category": "mains" },
		{ "title": "Chilli Meat Bites", "author": "Nice to Meat You", "photo": "main2", "category": "mains" },
		{ "title": "Your Favourite Ribs", "author": "Nice to Meat You", "photo": "main3", "category": "mains" },
		{ "title": "Burger at the Max", "author": "Burger Queen", "photo": "main4", "category": "mains" },
		{ "title": "Special Burger with Fries", "author": "Burger Queen", "photo": "main5", "category": "mains" },
		{ "title": "Everybody's Dream Hotdog", "author": "Prince Burger", "photo": "main6", "category": "mains" },
		{ "title": "Quinoa Balls", "author": "ReFresh", "photo": "main7", "category": "mains" },
		{ "title": "Bruschetta with Cheese", "author": "Sandwiches and More", "photo": "main8", "category": "mains" },
		{ "title": "Quick Toast with Bacon", "author": "Sandwiches and More", "photo": "main9", "category": "mains" },
		{ "title": "Special Steak with Fries", "author": "Nice to Meat You", "photo": "main10", "category": "mains" },
		{ "title": "Hotdog for Two", "author": "Prince Burger", "photo": "main11", "category": "mains" },
		{ "title": "Bruschetta with Salmon Fish", "author": "Ron's Fishery", "photo": "main12", "category": "mains" },
		{ "title": "Chief's Steak", "author": "Nice to Meat You", "photo": "main13", "category": "mains" },

	];

	constructor() {

		this.preparePictures();
	}

	get pictures(): Array<any> {
		return this._source;
	}

	private preparePictures() {
	}
}