import { Page, ViewBase } from "tns-core-modules/ui/page";
// import { isAndroid } from "tns-core-modules/platform";
import * as prof from "../common/profiling";
import * as builder from "tns-core-modules/ui/builder";
import { View } from "tns-core-modules/ui/core/view"
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

export class ExamplePage extends Page {

    private sideDrawer: RadSideDrawer;

    public constructor() {
        super();

        // TODO: Hides the back button for iOS, check if this can be set in XML or with cross platform API.
        this.on("navigatingTo", () => {
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
                this.sideDrawer.drawerContent.bindingContext = this.navigationContext;
            }
        });
    }

    public onLoaded() {
        super.onLoaded();

        // prof.stopCPUProfile("example");
        prof.stop("example");

        this.actionBar.actionItems.getItems().forEach((item: ViewBase) => {
            if (item.id === "exampleMenuButton") {
                item.off("tap", this.toggleDrawer, this);
                item.on("tap", this.toggleDrawer, this);
            }
        });
    }

    private toggleDrawer() {
        this.sideDrawer.toggleDrawerState();
    }
}
