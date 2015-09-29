import observable = require("data/observable");
import gridModule = require("ui/layouts/grid-layout");
import utils = require("utils/utils");
import models = require("./view-model");
import builder = require("ui/builder");
import frame = require("ui/frame");

var selectedItem;
export function rootGridLoaded(args: observable.EventData) {
    var grid = <gridModule.GridLayout>args.object;

    if (grid.android) {
        var compat = <any>android.support.v4.view.ViewCompat;
        if (compat.setElevation) {
            // Fix for the elevation glitch of the tab-view
            compat.setElevation(grid.android, 4 * utils.layout.getDisplayDensity());
        }
    }
}

export function onPageLoaded(args: observable.EventData) {
    var page = args.object;
    var dataModel = new models.CategoricalDataModel();
    page.bindingContext = dataModel;

}

export function repeaterItemTap(args: observable.EventData) {
    var item = args.view.bindingContext;

    if (selectedItem){
        selectedItem.isSelected = false;
    }
    item.isSelected = true;
    selectedItem = item;

    var exampleView = builder.load({
        path: "~/examples/chart/area",
        name: selectedItem.exampleXml,
        exports: exports
    });

    var exampleHolder = frame.topmost().getViewById("exampleHolder");
    if (exampleHolder.getChildrenCount() > 0){
        exampleHolder.removeChild(exampleHolder.getChildAt(0));
    }
    exampleHolder.addChild(exampleView);
}
