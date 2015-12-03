// import trace = require("trace");
// trace.setCategories(trace.categories.Layout);
// trace.enable();
import frame = require("ui/frame");
import exampleBase = require("./examples/example-base-page");
import application = require("application");
import prof = require("./common/profiling");

if(application.android) {
    application.onLaunch = function (intent) {
        console.log("onLaunch");
        com.facebook.drawee.backends.pipeline.Fresco.initialize(application.android.context);
        application.android.onActivityStarted = function (activity) {
            console.log("onStarted");
            var window = activity.getWindow();
            if (window) {
                window.setBackgroundDrawable(null);
            }
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
application.mainModule = "views/main-page";
// application.mainModule = "profile-main";
application.start();
