import pages = require("ui/page");
import buttonModule = require("ui/button");
import imageModule = require("ui/image");
import imageSourceModule = require("image-source");
import utils = require("utils/utils");
import gridModule = require("ui/layouts/grid-layout");
import navigator = require("../common/navigator");
import view = require("ui/core/view");
import platform = require("platform");
import prof = require("../common/profiling");
import builder = require("ui/builder");
import { View } from "ui/core/view"
import { RadSideDrawer } from "nativescript-telerik-ui-pro/sidedrawer";

var OVERLAY_ELEVATION = 12;
var CURVE = (platform.device.os === platform.platformNames.android) ? new android.view.animation.AccelerateDecelerateInterpolator() : UIViewAnimationCurve.UIViewAnimationCurveEaseInOut;

export class ExamplePage extends pages.Page {

    private sidedrawer: RadSideDrawer;

    public constructor() {
        super();

        // TODO: Hides the back button for iOS, check if this can be set in XML or with cross platform API.
        this.on("navigatingTo", args => {
            if (!this.sidedrawer) {
                var root = this.content;
                var originalRootBindingContext = root.bindingContext;
                var menufragment = <View>builder.load(__dirname + "/example-menu.xml", require("./example-menu"));
                this.sidedrawer = menufragment.getViewById("example-menu-drawer");
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
