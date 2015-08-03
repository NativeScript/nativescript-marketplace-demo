import observable = require("data/observable");
import view = require("ui/core/view");
import label = require("ui/label");

export function exampleLoaded(args: observable.EventData) {
    console.log("Example loaded")
}

export function exampleTap(args: observable.EventData) {
    console.log("Example tapped")
}