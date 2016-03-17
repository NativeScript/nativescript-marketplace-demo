import observable = require("data/observable");
import gridModule = require("ui/layouts/grid-layout");
import utils = require("utils/utils");
import models = require("./view-model");
import frame = require("ui/frame");
import pages = require("ui/page");
import gestures = require("ui/gestures");
import app = require("application");
import * as navigator from "../../common/navigator";

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

function loadItem(page, item: models.ChartTypeItem) {
    var dataModel = page.bindingContext;
    dataModel.loadGalleryFragment(item, page.getViewById("exampleHolder"), "~/examples/chart/line", item.exampleXml);
    var cartesianChart = page.getViewById("chart");
    if (app.android) {
        cartesianChart.horizontalAxis.android.setLabelFitMode(com.telerik.widget.chart.engine.axes.common.AxisLabelFitMode.MULTI_LINE);
    }
}

var dataModel = new models.ChartExamplesDataModel();
export function pageNavigatingTo(args: observable.EventData) {
    var page = <pages.Page>args.object;
    page.bindingContext = dataModel;
    var itemToLoad = dataModel.lineTypes[0];
    loadItem(page, itemToLoad);
}

export function scrollViewLoaded(args) {
    if (args.object.android) {
        args.object.android.setHorizontalScrollBarEnabled(false);
    }
}

export function repeaterItemTap(args: gestures.GestureEventData) {
    var item = args.view.bindingContext;
    var page = frame.topmost().currentPage;
    loadItem(page, item);
}

export function goBack(args) {
    navigator.navigateBackFromExample();
}
