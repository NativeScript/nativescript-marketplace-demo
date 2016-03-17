import observable = require("data/observable");
import gridModule = require("ui/layouts/grid-layout");
import utils = require("utils/utils");
import {Page} from "ui/page";
import {Color} from "color";
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

// TODO: This should be in "pageNavigatingTo" but that method is defined in the Page base class
export function pageNavigatingTo(args: observable.EventData) {
    var page = <Page>args.object;
    page.bindingContext = new observable.Observable({
        selectedIndex: 0
    });
}

export function goBack(args) {
    navigator.navigateBackFromExample();
}