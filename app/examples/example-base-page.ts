import { Page, Color } from "tns-core-modules/ui/page";
import * as prof from "../common/profiling";
import * as builder from "tns-core-modules/ui/builder";
import { View } from "tns-core-modules/ui/core/view"
import { knownFolders } from "tns-core-modules/file-system";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import * as drawerModule from "nativescript-ui-sidedrawer";

export class ExamplePage extends Page {

    private sideDrawer: RadSideDrawer;

    public constructor() {
        super();

        // TODO: Hides the back button for iOS, check if this can be set in XML or with cross platform API.
        this.on("navigatingTo", () => {
            if (!this.sideDrawer) {
                var exampleContent = this.content;
                this.sideDrawer = <RadSideDrawer>builder.load({
                    path: knownFolders.currentApp().path + "/examples/example-menu.xml",
                    name: "MyControl",
                    exports: require("./example-menu"),
                    attributes: {
                        bindingContext: exampleContent.bindingContext
                    }
                });
                this.content = this.sideDrawer;
                this.sideDrawer.mainContent = exampleContent;
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
                    this.sideDrawer.gesturesEnabled = true;
                    this.sideDrawer.drawerLocation = drawerModule.SideDrawerLocation.Bottom;
                    this.sideDrawer.showDrawer();
                });
            }
        });
    }

    private toggleDrawer() {
        this.sideDrawer.toggleDrawerState();
    }
}
