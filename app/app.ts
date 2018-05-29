import "./bundle-config";
import * as application from "application";
// import * as frame from "ui/frame";
// import * as exampleBase from "./examples/example-base-page";
// import * as prof from "./common/profiling";
// import * as trace from "trace";
import * as utils from "utils/utils";
// import { time, uptime } from "profiling";
import "nativescript-plugin-firebase";

import * as json from "~/package.json";

import { init as initFirebase } from "./common/firebase";

// console.log("App config is: " + JSON.stringify(json));
// application.on("displayed", () => {
//   var now = time();
//   var started = now - uptime();
//   console.log("Timeline: Startup time...  (" + started + "ms. - " + now + "ms.)");
// });

// The location of this import is important. iOS swizzles the app delegate.
initFirebase();

if (application.android) {
    application.on("launch", args => {
        console.log("onLaunch");
        com.facebook.drawee.backends.pipeline.Fresco.initialize(application.android.context);
        application.android.on("activityStarted", ({activity}) => {
            console.log("onStarted");
            var window = activity.getWindow();
            if (window) {
                window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(0xFF151F2F));

                // Prevent the soft keyboard from hiding EditText's while typing.
                window.setSoftInputMode(32); //android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN;
            }
        });
    });
}

if (application.ios) {
    application.on("launch", args => {
        utils.ios.getter(UIApplication, UIApplication.sharedApplication).statusBarStyle = UIStatusBarStyle.UIStatusBarStyleLightContent;
        setTimeout(() => {
            utils.ios.getter(UIApplication, UIApplication.sharedApplication).keyWindow.backgroundColor = utils.ios.getter(UIColor, UIColor.blackColor);
        }, 1);
    });
}

// prof.start("main-page");

application.run("app-root");
