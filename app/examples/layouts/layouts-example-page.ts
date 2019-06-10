import * as observable from "tns-core-modules/data/observable";
import * as gridModule from "tns-core-modules/ui/layouts/grid-layout";
import * as utils from "tns-core-modules/utils/utils";
import { Page } from "tns-core-modules/ui/page";
import { Color } from "tns-core-modules/color";
import * as navigator from "../../common/navigator";
import { View } from "tns-core-modules/ui/core/view";
import * as tabViewModule from "tns-core-modules/ui/tab-view";

let page: Page;

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

// TODO: This should be in "pageNavigatingTo" but that method is defined in the Page base class
export function pageNavigatingTo(args: observable.EventData) {
    page = <Page>args.object;
    page.bindingContext = observable.fromObject({
        selectedIndex: 0
    });
    selectedIndexChanged(null);
}

export function goBack(args) {
    navigator.navigateBackFromExample();
}

export function selectedIndexChanged(args) {
    if (page !== undefined) {
        let tabView = page.getViewById<tabViewModule.TabView>("tabView");
        let index = tabView.selectedIndex;
        let names = ["btn-red", "btn-yellow", "btn-blue", "btn-lightblue", "btn-lightgreen"];
        for (let name of names) {
            let view = page.getViewById<View>("" + index + name);
            if (view !== undefined) {
                view.className = name;
                view.className = name + "-animated";
            }
        }
    }
}

export function buttonTap(args: observable.EventData) {
    let button = <View>args.object;
    let className = button.className.replace("-animated", "").replace("2", "");
    button.className = className;
    button.className = className + "-animated2";
}