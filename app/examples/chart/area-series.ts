import observable = require("data/observable");
import gridModule = require("ui/layouts/grid-layout");
import utils = require("utils/utils");
import models = require("./view-model");

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

export function onPageLoaded(args: observable.EventData){
    var page = args.object;
    page.bindingContext = new models.CategoricalDataModel();
}

export function onTabViewLoaded(args: observable.EventData){
    var tabView = args.object;
    tabView.bindingContext = models.CategoricalDataModel();
}
