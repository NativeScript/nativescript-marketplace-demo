import { Page } from "tns-core-modules/ui/page";
// import { isAndroid } from "tns-core-modules/platform";
import * as prof from "../common/profiling";
import * as builder from "tns-core-modules/ui/builder";
import { View } from "tns-core-modules/ui/core/view"
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

// var OVERLAY_ELEVATION = 12;
// var CURVE = isAndroid ? new android.view.animation.AccelerateDecelerateInterpolator() : UIViewAnimationCurve.UIViewAnimationCurveEaseInOut;

export class ExamplePage extends Page {

    private sideDrawer: RadSideDrawer;

    public constructor() {
        super();

        // TODO: Hides the back button for iOS, check if this can be set in XML or with cross platform API.
        this.on("navigatingTo", args => {
            if (!this.sideDrawer) {
                const root = this.content;
                const originalRootBindingContext = root.bindingContext;
                const menuPath = "examples/example-menu.xml";
                const menuFragment = <View>builder.load(menuPath, global.loadModule("examples/example-menu"));
                this.sideDrawer = <RadSideDrawer>menuFragment.getViewById("example-menu-drawer");
                this.content = menuFragment;
                this.sideDrawer.mainContent = root;
                if (root.bindingContext !== originalRootBindingContext) {
                    root.bindingContext = originalRootBindingContext;
                }
                this.sideDrawer.drawerContent.bindingContext = this.navigationContext;
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
                    this.sideDrawer.gesturesEnabled = true;
                    this.sideDrawer.showDrawer();
                });
            }
        });
    }
}
