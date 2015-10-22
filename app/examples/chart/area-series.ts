import observable = require("data/observable");
import gridModule = require("ui/layouts/grid-layout");
import utils = require("utils/utils");
import models = require("./view-model");
import frame = require("ui/frame");
import pages = require("ui/page");
import gestures = require("ui/gestures");

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
    dataModel.loadGalleryFragment(item, page.getViewById("exampleHolder"), "~/examples/chart/area", item.exampleXml);
    var cartesianChart = page.getViewById("chart");
    cartesianChart.horizontalAxis.android.setLabelFitMode(com.telerik.widget.chart.engine.axes.common.AxisLabelFitMode.MULTI_LINE);
}
var dataModel = new models.ChartExamplesDataModel();
export function onPageLoaded(args: observable.EventData) {
    var page = <pages.Page>args.object;
    page.bindingContext = dataModel;
    var itemToLoad = dataModel.areaTypes[0];
    loadItem(page, itemToLoad);
    page.getViewById("scrollView").android.setHorizontalScrollBarEnabled(false);
}

export function repeaterItemTap(args: gestures.GestureEventData) {
    var item = args.view.bindingContext;
    var page = frame.topmost().currentPage;
    loadItem(page, item);
}
