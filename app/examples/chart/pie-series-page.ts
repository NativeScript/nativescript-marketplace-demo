import * as observable from "tns-core-modules/data/observable";
import * as gridModule from "tns-core-modules/ui/layouts/grid-layout";
import * as utils from "tns-core-modules/utils/utils";
import * as models from "./view-model";
import * as frame from "tns-core-modules/ui/frame";
import * as pages from "tns-core-modules/ui/page";
import * as gestures from "tns-core-modules/ui/gestures";
import * as app from "tns-core-modules/application";
import * as navigator from "../../common/navigator";

export function rootGridLoaded(args: observable.EventData) {
    var grid = <gridModule.GridLayout>args.object;

    if (grid.android) {
        var compat = <any>androidx.core.view.ViewCompat;
        if (compat.setElevation) {
            // Fix for the elevation glitch of the tab-view
            compat.setElevation(grid.android, 4 * utils.layout.getDisplayDensity());
        }
    }
}

function loadItem(page, item: models.ChartTypeItem) {
    var dataModel = page.bindingContext;
    dataModel.loadGalleryFragment(item, page.getViewById("exampleHolder"), "~/examples/chart/pie", item.exampleXml);
}

var dataModel = new models.ChartExamplesDataModel(false);
export function pageNavigatingTo(args: observable.EventData) {
    var page = <pages.Page>args.object;
    page.bindingContext = dataModel;
    var itemToLoad = dataModel.pieTypes[0];
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
