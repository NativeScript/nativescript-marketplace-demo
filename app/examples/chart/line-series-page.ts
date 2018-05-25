import * as observable from "data/observable";
import * as gridModule from "ui/layouts/grid-layout";
import * as utils from "utils/utils";
import * as models from "./view-model";
import * as frame from "ui/frame";
import * as pages from "ui/page";
import * as gestures from "ui/gestures";
import * as app from "application";
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

var dataModel = new models.ChartExamplesDataModel(true);
export function pageNavigatingTo(args: observable.EventData) {
    var page = <pages.Page>args.object;
    page.bindingContext = dataModel;
    var itemToLoad = dataModel.lineTypes[0];
    loadItem(page, itemToLoad);
}

export function pageNavigatingFrom(args: observable.EventData) {
    var page = <pages.Page>args.object;
    page.bindingContext.clearCache();
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
