// import trace = require("trace");
// trace.setCategories(trace.categories.Style);
// trace.enable();

import frame = require("ui/frame");
import exampleBase = require("./examples/example-base-page");
import application = require("application");
import prof = require("./common/profiling");
import * as trace from "trace";
import * as analytics from "./common/analytics";
import "./bundle-modules";

 
application.on("uncaughtError", args => {
    var error = args.android || args.ios;
    if (error.nativeException){
        error = {
            name: error.name,
            message: error.message,
            stack: error.stackTrace
        };
    }
    analytics.trackException(error, `Uncaught application error`);
});

application.on(application.launchEvent, context => {
    analytics.start();
});

var inAppTime: analytics.TimeToken;
application.on(application.resumeEvent, data => {
    console.log("Resume");
    inAppTime = analytics.trackTimingStart("In app time");
});

application.on(application.suspendEvent, data => {
    console.log("Suspend");
    if (inAppTime) {
        inAppTime.stop();
        inAppTime = undefined;
    }
});

declare var org;
if (application.android) {
    application.onLaunch = function (intent) {
        console.log("onLaunch");
        com.facebook.drawee.backends.pipeline.Fresco.initialize(application.android.context);
        application.android.onActivityStarted = function (activity) {
            console.log("onStarted");
            var window = activity.getWindow();
            if (window) {
                window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(0xFF151F2F));
                
                // Prevent the soft keyboard from hiding EditText's while typing.
                window.setSoftInputMode(32); //android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN;
            }
        }
        
        // Enable ACRA Telerik Analytics crash reporting
        var packageJson = require("./package.json");
        var analyticsProductKeyAndroid = packageJson.analyticsProductKeyAndroid;
        if (analyticsProductKeyAndroid) {
            org.nativescript.ata.AnalyticsReportSender.init(application.android.nativeApp, analyticsProductKeyAndroid);
        }
    }
}

if (application.ios) {
    application.on("launch", args => {
        // TODO: It would be nice if this was ios-specific property on the action bar and static property on application.ios.
        UIApplication.sharedApplication().statusBarStyle = UIStatusBarStyle.UIStatusBarStyleLightContent;
        setTimeout(() => {
            UIApplication.sharedApplication().keyWindow.backgroundColor = UIColor.blackColor();
        }, 1);
    });
}

prof.start("main-page");
application.mainModule = "views/main-page/main-page";
// application.mainModule = "profile-main";
application.start();
