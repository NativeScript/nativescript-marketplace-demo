import { Page, Color } from "tns-core-modules/ui/page";
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
            if (!this.sideDrawer) {
                var exampleContent = this.content;
                var menuPath = knownFolders.currentApp().path + "/examples/example-menu.xml";
                
                this.sideDrawer = <RadSideDrawer>builder.load(menuPath, require("./example-menu"));
                this.content = this.sideDrawer;
                this.sideDrawer.mainContent = exampleContent;

                var originalRootBindingContext = exampleContent.bindingContext;
                if (exampleContent.bindingContext !== originalRootBindingContext){
                    exampleContent.bindingContext = originalRootBindingContext;
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

    private toggleDrawer() {
        this.sideDrawer.toggleDrawerState();
    }
}
