import * as pages from "tns-core-modules/ui/page";
import { Page } from "tns-core-modules/ui/page";
import * as buttonModule from "tns-core-modules/ui/button";
import * as imageModule from "tns-core-modules/ui/image";
import * as imageSourceModule from "image-source";
import * as utils from "utils/utils";
import * as gridModule from "ui/layouts/grid-layout";
import * as navigator from "../common/navigator";
import * as view from "tns-core-modules/ui/core/view";
import * as platform from "platform";
import * as prof from "../common/profiling";
import * as builder from "tns-core-modules/ui/builder";
import { View } from "tns-core-modules/ui/core/view"
import {knownFolders} from "file-system";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

var OVERLAY_ELEVATION = 12;
var CURVE = (platform.device.os === platform.platformNames.android) ? new android.view.animation.AccelerateDecelerateInterpolator() : UIViewAnimationCurve.UIViewAnimationCurveEaseInOut;

export class ExamplePage extends Page {

    private sidedrawer: RadSideDrawer;

    public constructor() {
        super();

        // TODO: Hides the back button for iOS, check if this can be set in XML or with cross platform API.
        this.on("navigatingTo", args => {
            if (!this.sidedrawer) {
                var root = this.content;
                var originalRootBindingContext = root.bindingContext;
                var menuPath = knownFolders.currentApp().path + "/examples/example-menu.xml";
                var menufragment = <View>builder.load(menuPath, require("./example-menu"));
                this.sidedrawer = <RadSideDrawer>menufragment.getViewById("example-menu-drawer");
                this.content = menufragment;
                this.sidedrawer.mainContent = root;
                if (root.bindingContext !== originalRootBindingContext){
                    root.bindingContext = originalRootBindingContext;
                }
                this.sidedrawer.drawerContent.bindingContext = this.navigationContext;
            }
        });
    }

    public onLoaded() {
        super.onLoaded();

        // prof.stopCPUProfile("example");
        prof.stop("example");

        this.actionBar.actionItems.getItems().forEach(item => {
            if ((<any>item).id === "exampleMenuButton") {
                item.on("tap", () => {
                    // TODO: Toggle instead
                    this.sidedrawer.gesturesEnabled = true;
                    this.sidedrawer.showDrawer();
                });
            }
        });
    }
}
