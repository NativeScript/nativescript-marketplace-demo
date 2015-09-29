
import bindable = require("ui/core/bindable");
import observable = require("data/observable");


export class CategoricalDataModel {
    constructor() {
        console.log("Creating model");
    }

    get categoricalSource() {
        console.log("Getting categorical source");
        return [
            { Category: "Greenings", Amount: 65.0 },
            { Category: "Perfecto", Amount: 62.0 },
            { Category: "FamilyStore", Amount: 55.0 },
            { Category: "Fresh&Green", Amount: 71.0 },
            { Category: "NearBy", Amount: 92.0 }
        ];
    }

    get categoricalSource2() {
        return [
            { Category: "Greenings", Amount: 5 },
            { Category: "Perfecto", Amount: 15 },
            { Category: "FamilyStore", Amount: 3 },
            { Category: "Fresh&Green", Amount: 45 },
            { Category: "NearBy", Amount: 10 }
        ];
    }

    get categoricalSource3() {
        return [
            { Category: "Greenings", Amount: 65 },
            { Category: "Perfecto", Amount: 56 },
            { Category: "FamilyStore", Amount: 89 },
            { Category: "Fresh&Green", Amount: 68 },
            { Category: "NearBy", Amount: 69 }
        ];
    }

    get areaSource() {
        return [
            { Category: "Greenings", Amount: 51 },
            { Category: "Perfecto", Amount: 81 },
            { Category: "FamilyStore", Amount: 89 },
            { Category: "Fresh&Green", Amount: 60 },
            { Category: "NearBy", Amount: 59 }
        ];
    }

    get areaSource2() {
        return [
            { Category: "Greenings", Amount: 60 },
            { Category: "Perfecto", Amount: 87 },
            { Category: "FamilyStore", Amount: 91 },
            { Category: "Fresh&Green", Amount: 95 },
            { Category: "NearBy", Amount: 89 }
        ];
    }

    get bubbleCategoricalSource() {
        return [
            { Country: "Germany", Amount: Math.random() * 10, Impact: 1 },
            { Country: "France", Amount: Math.random() * 10, Impact: 7 },
            { Country: "Bulgaria", Amount: Math.random() * 10, Impact: 10 },
            { Country: "Spain", Amount: Math.random() * 10, Impact: 3 },
            { Country: "USA", Amount: Math.random() * 10, Impact: 4 }
        ];
    }

    get pieSource() {
        return [
            { Country: "Germany", Amount: 40.0 },
            { Country: "France", Amount: 60.0 },
        ];
    }

    get pieSource2() {
        return [
            { Country: "Bulgaria", Amount: 40.0 },
            { Country: "Spain", Amount: 30.0 },
            { Country: "USA", Amount: 30.0 }
        ];
    }

    get areaTypes() {
        return [
            new ChartTypeItem(true, "res://chart/area/area1", "area1"),
            new ChartTypeItem(false, "res://chart/area/area2", "area2"),
            new ChartTypeItem(false, "res://chart/area/area3", "area3"),
            new ChartTypeItem(false, "res://chart/area/area4", "area4"),
            new ChartTypeItem(false, "res://chart/area/area5", "area5"),
            new ChartTypeItem(false, "res://chart/area/area6", "area6")
        ];
    }

    get barTypes(){
        return [
            new ChartTypeItem(true, "res://chart/bar/bar1", "bar1"),
            new ChartTypeItem(false, "res://chart/bar/bar2", "bar2"),
            new ChartTypeItem(false, "res://chart/bar/bar3", "bar3"),
            new ChartTypeItem(false, "res://chart/bar/bar4", "bar4"),
            new ChartTypeItem(false, "res://chart/bar/bar5", "bar5"),
            new ChartTypeItem(false, "res://chart/bar/bar6", "bar6")
        ];
    }

    get lineTypes(){
        return [
            new ChartTypeItem(true, "res://chart/line/line1", "line1"),
            new ChartTypeItem(false, "res://chart/line/line2", "line2"),
            new ChartTypeItem(false, "res://chart/line/line3", "line3"),
            new ChartTypeItem(false, "res://chart/line/line4", "line4"),
            new ChartTypeItem(false, "res://chart/line/line5", "line5"),
            new ChartTypeItem(false, "res://chart/line/line6", "line6")
        ];
    }

    get pieTypes(){
        return [
            new ChartTypeItem(true, "res://chart/line/pie1", "pie1"),
            new ChartTypeItem(false, "res://chart/line/pie2", "pie2"),
            new ChartTypeItem(false, "res://chart/line/pie3", "pie3"),
            new ChartTypeItem(false, "res://chart/line/pie4", "pie4")
        ];
    }
}

export class ChartTypeItem extends observable.Observable {

    constructor(selected, imageResource, xmlResource){
        super();
        this.isSelected = selected;
        this.imageRes = imageResource;
        this.exampleXml = xmlResource;
    }

    get isSelected() {
        return this.get("selected");
    }

    set isSelected(value) {
        this.set("selected", value);
    }

    get imageRes(){
        return this.get("imgRes") + ".png";
    }

    set imageRes(value){
        this.set("imgRes", value);
    }

    get selectedImageRes(){
        return this.get("imgRes") + "s.png";
    }

    get exampleXml(){
        return this.get("exXml");
    }

    set exampleXml(value){
        this.set("exXml", value);
    }
}
