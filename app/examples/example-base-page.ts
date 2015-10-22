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

var OVERLAY_ELEVATION = 12;
var CURVE = (platform.device.os === platform.platformNames.android) ? new android.view.animation.AccelerateDecelerateInterpolator() : UIViewAnimationCurve.UIViewAnimationCurveEaseInOut;

export class ExamplePage extends pages.Page {

    public bottomOffset: number = 0;

    public constructor() {
        super();

        // TODO: Hides the back button for iOS, check if this can be set in XML or with cross platform API.
        this.on("navigatingTo", args => {
            if (this.ios) {
                var viewController = <UIViewController>this.ios;
                viewController.navigationItem.hidesBackButton = true;
            }
        });
    }
    public onLoaded() {
        super.onLoaded();

        if (!(this.content instanceof gridModule.GridLayout)) {
            // We can remove this limitation in future if it is a problem.
            throw new Error("Root of example page should be Grid");
        }

        var root = <gridModule.GridLayout>this.content;

        this.addOverlayButton(root);

        //prof.stopCPUProfile("example");
    //    prof.pause("example");

    }

    private addOverlayButton(root: gridModule.GridLayout) {
        var overlay = new imageModule.Image();
        root.addChild(overlay);

        gridModule.GridLayout.setRow(overlay, 100);
        overlay.imageSource = imageSourceModule.fromFileOrResource("res://ic_fullscreen_exit");
        overlay.cssClass = "example-overlay-button";
        overlay.on("tap", (args) => {
            // TODO: plug animations here
            
            //
            navigator.navigateBackFromExampe(this.navigationContext);
        });

        overlay.marginBottom = this.bottomOffset;

        if (platform.device.os === platform.platformNames.android) {
            overlay.android.setPivotX(0);
            overlay.android.setPivotY(100);
        }
        else if (platform.device.os === platform.platformNames.ios) {
            overlay.ios.layer.anchorPoint = { x: 0, y: 1 };
        }

        var scale = (scale, duration: number = 120) => () => overlay.animate({
            scale: { x: scale, y: scale },
            duration: duration,
            curve: CURVE
        });
        scale(0, 1)()
            .then(scale(2))
            .then(scale(0.8))
            .then(scale(1.7))
            .then(scale(0.9))
            .then(scale(1.4))
            .then(scale(1));

        if (overlay.android) {
            var compat = <any>android.support.v4.view.ViewCompat;
            if (compat.setElevation) {
                compat.setElevation(overlay.android, OVERLAY_ELEVATION * utils.layout.getDisplayDensity());
            }
        }
    }
}
