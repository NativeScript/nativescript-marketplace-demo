import pages = require("ui/page");
import buttonModule = require("ui/button");
import imageModule = require("ui/image");
import imageSourceModule = require("image-source");
import utils = require("utils/utils");
import gridModule = require("ui/layouts/grid-layout");
import navigator = require("../common/navigator");

var OVERLAY_ELEVATION = 12;

export class ExamplePage extends pages.Page {
    public onLoaded() {
        super.onLoaded();
        console.log("ExamplePage.onLoaded()");

        if (!(this.content instanceof gridModule.GridLayout)) {
            // We can remove this limitation in future if it is a problem.
            throw new Error("Root of example page should be Grid");
        }

        var root = <gridModule.GridLayout>this.content;
        
        this.addOverlayButton(root);
     }

    private addOverlayButton(root:gridModule.GridLayout) {
        var overaly = new imageModule.Image();
        root.addChild(overaly);
        
        gridModule.GridLayout.setRow(overaly, 100);
        overaly.imageSource = imageSourceModule.fromFileOrResource("res://ic_fullscreen_exit");
        overaly.cssClass = "example-overlay-button";
        overaly.on("tap", (args) => {
            // TODO: plug animations here
            navigator.navigateBack();
        });
        
        if (overaly.android) {
            var compat = <any>android.support.v4.view.ViewCompat;
            if (compat.setElevation) {
                compat.setElevation(overaly.android, OVERLAY_ELEVATION * utils.layout.getDisplayDensity());
            }
        }
    }
}
