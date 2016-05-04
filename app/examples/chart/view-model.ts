
import bindable = require("ui/core/bindable");
import observable = require("data/observable");
import builder = require("ui/builder");
import app = require("application");
import utils = require("utils/utils");


export class ChartExamplesDataModel {
    private _categoricalSource;
    private _categoricalSource2;
    private _categoricalSource3;
    private _areaSource;
    private _areaSource2;
    private _bubbleCategoricalSource;
    private _pieSource;
    private _pieSource2;
    private _pieSource3;
    private _areaTypes;
    private _pieTypes;
    private _lineTypes;
    private _barTypes;
    private selectedItem: ChartTypeItem;
    private _views;

    constructor() {
        this.clearCache();
    }

    public clearCache() {
        this._views = {};
    }

    public loadGalleryFragment(item: ChartTypeItem, viewHolder, pathToModuleXML: string, exampleXmlName: string) {

        if (this.selectedItem) {
            this.selectedItem.isSelected = false;
        }

        item.isSelected = true;
        this.selectedItem = item;

        var exampleView = viewHolder.android ? this._views[pathToModuleXML + exampleXmlName] : null;
        if (!exampleView) {
            exampleView = builder.load({
                path: pathToModuleXML,
                name: exampleXmlName
            });
            if (viewHolder.android) {
                this._views[pathToModuleXML + exampleXmlName] = exampleView;
            }
        }

        if (viewHolder.getChildrenCount() > 0) {
            var child = viewHolder.getChildAt(0);
            viewHolder.removeChild(child);
            child = null;
        }

        viewHolder.addChild(exampleView);
    }

    get categoricalSource() {
        if (this._categoricalSource) {
            return this._categoricalSource;
        }
        return this._categoricalSource = [
            { Category: "Mar", Amount: 65.0 },
            { Category: "Apr", Amount: 62.0 },
            { Category: "May", Amount: 55.0 },
            { Category: "Jun", Amount: 71.0 }
        ];
    }

    get categoricalSource2() {
        if (this._categoricalSource2) {
            return this._categoricalSource2;
        }
        return this._categoricalSource2 = [
            { Category: "Mar", Amount: 5 },
            { Category: "Apr", Amount: 15 },
            { Category: "May", Amount: 3 },
            { Category: "Jun", Amount: 45 }
        ];
    }

    get categoricalSource3() {
        if (this._categoricalSource3) {
            return this._categoricalSource3;
        }
        return this._categoricalSource3 = [
            { Category: "Mar", Amount: 65 },
            { Category: "Apr", Amount: 56 },
            { Category: "May", Amount: 89 },
            { Category: "Jun", Amount: 68 }
        ];
    }

    get areaSource() {
        if (this._areaSource) {
            return this._areaSource;
        }
        return this._areaSource = [
            { Category: "Mar", Amount: 51 },
            { Category: "Apr", Amount: 81 },
            { Category: "May", Amount: 89 },
            { Category: "Jun", Amount: 60 }
        ];
    }

    get areaSource2() {
        if (this._areaSource2) {
            return this._areaSource2;
        }
        return this._areaSource2 = [
            { Category: "Mar", Amount: 60 },
            { Category: "Apr", Amount: 87 },
            { Category: "May", Amount: 91 },
            { Category: "Jun", Amount: 95 }
        ];
    }

    get bubbleCategoricalSource() {
        if (this._bubbleCategoricalSource) {
            return this._bubbleCategoricalSource;
        }
        return this._bubbleCategoricalSource = [
            { Country: "Germany", Amount: Math.random() * 10, Impact: 1 },
            { Country: "France", Amount: Math.random() * 10, Impact: 7 },
            { Country: "Bulgaria", Amount: Math.random() * 10, Impact: 10 },
            { Country: "Spain", Amount: Math.random() * 10, Impact: 3 },
            { Country: "USA", Amount: Math.random() * 10, Impact: 4 }
        ];
    }

    get pieSource() {
        if (this._pieSource) {
            return this._pieSource;
        }
        return this._pieSource = [
            { Country: "Belgium", Amount: 20.0 },
            { Country: "Germany", Amount: 50.0 },
            { Country: "UK", Amount: 30.0 }
        ];
    }

   get pieSource2() {
        if (this._pieSource2) {
            return this._pieSource2;
        }
        return this._pieSource2 = [
            { Company: "Google", Amount: 20.0 },
            { Company: "Apple", Amount: 30.0 },
            { Company: "Microsoft", Amount: 10.0 },
            { Company: "Oracle", Amount: 8.0 }
        ];
    }

    get pieSource3() {
        if (this._pieSource3) {
            return this._pieSource3;
        }
        return this._pieSource3 = [
            { Level: "Elementary", Amount: 180.0 },
            { Level: "Higher", Amount: 120.0 },
            { Level: "Training", Amount: 60.0 }
        ];
    }

    private getPictureResourcePath(groupName: string, exampleName: string) {
        if (app.ios) {
            return "res://chart/" + groupName + "/" + exampleName;
        }
        var resourcePath = "res://" + exampleName;
        return resourcePath;
    }

    get areaTypes() {
        if (this._areaTypes) {
            return this._areaTypes;
        }
        return this._areaTypes = [
            new ChartTypeItem(true, this.getPictureResourcePath("area", "area1"), "area1"),
            new ChartTypeItem(false, this.getPictureResourcePath("area", "area2"), "area2"),
            new ChartTypeItem(false, this.getPictureResourcePath("area", "area3"), "area3"),
            new ChartTypeItem(false, this.getPictureResourcePath("area", "area4"), "area4"),
            new ChartTypeItem(false, this.getPictureResourcePath("area", "area5"), "area5"),
            new ChartTypeItem(false, this.getPictureResourcePath("area", "area6"), "area6")
        ];
    }

    get barTypes() {
        if (this._barTypes) {
            return this._barTypes;
        }
        return this._barTypes = [
            new ChartTypeItem(true, this.getPictureResourcePath("bar", "bar1"), "bar1"),
            new ChartTypeItem(false, this.getPictureResourcePath("bar", "bar2"), "bar2"),
            new ChartTypeItem(false, this.getPictureResourcePath("bar", "bar3"), "bar3"),
            new ChartTypeItem(false, this.getPictureResourcePath("bar", "bar4"), "bar4"),
            new ChartTypeItem(false, this.getPictureResourcePath("bar", "bar5"), "bar5"),
            new ChartTypeItem(false, this.getPictureResourcePath("bar", "bar6"), "bar6")
        ];
    }

    get lineTypes() {
        if (this._lineTypes) {
            return this._lineTypes;
        }
        return this._lineTypes = [
            new ChartTypeItem(true, this.getPictureResourcePath("line", "line1"), "line1"),
            new ChartTypeItem(false, this.getPictureResourcePath("line", "line2"), "line2"),
            new ChartTypeItem(false, this.getPictureResourcePath("line", "line3"), "line3"),
            new ChartTypeItem(false, this.getPictureResourcePath("line", "line4"), "line4")
        ];
    }

    get pieTypes() {
        if (this._pieTypes) {
            return this._pieTypes;
        }
        return this._pieTypes = [
            new ChartTypeItem(true, this.getPictureResourcePath("pie", "pie1"), "pie1"),
            new ChartTypeItem(false, this.getPictureResourcePath("pie", "pie2"), "pie2"),
            new ChartTypeItem(false, this.getPictureResourcePath("pie", "pie3"), "pie3"),
        ];
    }
}

export class ChartTypeItem extends observable.Observable {

    constructor(selected, imageResource, xmlResource) {
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

    get imageRes() {
        return this.get("imgRes");
    }

    set imageRes(value) {
        this.set("imgRes", value);
    }

    get selectedImageRes() {
        var suffix = app.ios ? "s" : "";
        return this.get("imgRes") + suffix;
    }

    get exampleXml() {
        return this.get("exXml");
    }

    set exampleXml(value) {
        this.set("exXml", value);
    }
}
