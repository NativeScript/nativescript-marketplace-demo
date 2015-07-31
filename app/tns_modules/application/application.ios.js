var appModule = require("application/application-common");
var frame = require("ui/frame");
var utils = require("utils/utils");
var types = require("utils/types");
var definition = require("application");
var enums = require("ui/enums");
global.moduleMerge(appModule, exports);
exports.mainModule;
var Window = (function (_super) {
    __extends(Window, _super);
    function Window() {
        _super.apply(this, arguments);
    }
    Window.prototype.initWithFrame = function (frame) {
        var window = _super.prototype.initWithFrame.call(this, frame);
        if (window) {
            window.autoresizingMask = UIViewAutoresizing.UIViewAutoresizingNone;
        }
        return window;
    };
    Object.defineProperty(Window.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            this._content = value;
        },
        enumerable: true,
        configurable: true
    });
    Window.prototype.layoutSubviews = function () {
        utils.ios._layoutRootView(this._content, UIScreen.mainScreen().bounds);
    };
    return Window;
})(UIWindow);
var TNSAppDelegate = (function (_super) {
    __extends(TNSAppDelegate, _super);
    function TNSAppDelegate() {
        _super.apply(this, arguments);
    }
    TNSAppDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        this.window = Window.alloc().initWithFrame(UIScreen.mainScreen().bounds);
        this.window.backgroundColor = UIColor.whiteColor();
        if (exports.onLaunch) {
            exports.onLaunch();
        }
        exports.notify({ eventName: definition.launchEvent, object: this, ios: launchOptions });
        var topFrame = frame.topmost();
        if (!topFrame) {
            if (exports.mainModule) {
                topFrame = new frame.Frame();
                topFrame.navigate(exports.mainModule);
            }
            else {
                return;
            }
        }
        var app = exports.ios;
        setupOrientationListener(app);
        this.window.content = topFrame;
        this.window.rootViewController = topFrame.ios.controller;
        app.rootController = this.window.rootViewController;
        this.window.makeKeyAndVisible();
        return true;
    };
    TNSAppDelegate.prototype.applicationDidBecomeActive = function (application) {
        if (exports.onResume) {
            exports.onResume();
        }
        exports.notify({ eventName: definition.resumeEvent, object: this, ios: application });
    };
    TNSAppDelegate.prototype.applicationWillResignActive = function (application) {
    };
    TNSAppDelegate.prototype.applicationDidEnterBackground = function (application) {
        if (exports.onSuspend) {
            exports.onSuspend();
        }
        exports.notify({ eventName: definition.suspendEvent, object: this, ios: application });
    };
    TNSAppDelegate.prototype.applicationWillEnterForeground = function (application) {
    };
    TNSAppDelegate.prototype.applicationWillTerminate = function (application) {
        if (exports.onExit) {
            exports.onExit();
        }
        exports.notify({ eventName: definition.exitEvent, object: this, ios: application });
    };
    TNSAppDelegate.prototype.applicationDidReceiveMemoryWarning = function (application) {
        if (exports.onLowMemory) {
            exports.onLowMemory();
        }
        exports.notify({ eventName: definition.lowMemoryEvent, object: this, android: undefined, ios: application });
    };
    TNSAppDelegate.prototype.applicationOpenURLSourceApplicationAnnotation = function (application, url, sourceApplication, annotation) {
        var dictionary = new NSMutableDictionary();
        dictionary.setObjectForKey(url, "TLKApplicationOpenURL");
        dictionary.setObjectForKey(application, "TLKApplication");
        NSNotificationCenter.defaultCenter().postNotificationNameObjectUserInfo("com.telerik.TLKApplicationOpenURL", null, dictionary);
        return true;
    };
    TNSAppDelegate.ObjCProtocols = [UIApplicationDelegate];
    return TNSAppDelegate;
})(UIResponder);
var NotificationReceiver = (function (_super) {
    __extends(NotificationReceiver, _super);
    function NotificationReceiver() {
        _super.apply(this, arguments);
    }
    NotificationReceiver.new = function () {
        return _super.new.call(this);
    };
    NotificationReceiver.prototype.initWithCallback = function (onReceiveCallback) {
        this._onReceiveCallback = onReceiveCallback;
        return this;
    };
    NotificationReceiver.prototype.onReceive = function (notification) {
        this._onReceiveCallback(notification);
    };
    NotificationReceiver.ObjCExposedMethods = {
        "onReceive": { returns: interop.types.void, params: [NSNotification] }
    };
    return NotificationReceiver;
})(NSObject);
var IOSApplication = (function () {
    function IOSApplication() {
        this._registeredObservers = {};
        this.nativeApp = UIApplication.sharedApplication();
    }
    IOSApplication.prototype.addNotificationObserver = function (notificationName, onReceiveCallback) {
        var observer = NotificationReceiver.new().initWithCallback(onReceiveCallback);
        NSNotificationCenter.defaultCenter().addObserverSelectorNameObject(observer, "onReceive", notificationName, null);
        this._registeredObservers[notificationName] = observer;
    };
    IOSApplication.prototype.removeNotificationObserver = function (notificationName) {
        var observer = this._registeredObservers[notificationName];
        if (observer) {
            NSNotificationCenter.defaultCenter().removeObserverNameObject(observer, notificationName, null);
        }
    };
    return IOSApplication;
})();
var app = new IOSApplication();
exports.ios = app;
exports.start = function () {
    appModule.loadCss();
    try {
        UIApplicationMain(0, null, null, "TNSAppDelegate");
    }
    catch (error) {
        if (!types.isFunction(exports.onUncaughtError)) {
            return;
        }
        exports.onUncaughtError(error);
        definition.notify({ eventName: definition.uncaughtErrorEvent, object: definition.ios, ios: error });
    }
};
var currentOrientation;
function setupOrientationListener(iosApp) {
    iosApp.addNotificationObserver(UIDeviceOrientationDidChangeNotification, onOreintationDidChange);
    currentOrientation = UIDevice.currentDevice().orientation;
}
function onOreintationDidChange(notification) {
    var orientation = UIDevice.currentDevice().orientation;
    if (currentOrientation !== orientation) {
        currentOrientation = orientation;
        var newValue;
        switch (orientation) {
            case UIDeviceOrientation.UIDeviceOrientationLandscapeRight:
            case UIDeviceOrientation.UIDeviceOrientationLandscapeLeft:
                newValue = enums.DeviceOrientation.landscape;
                break;
            case UIDeviceOrientation.UIDeviceOrientationPortrait:
            case UIDeviceOrientation.UIDeviceOrientationPortraitUpsideDown:
                newValue = enums.DeviceOrientation.portrait;
                break;
            default:
                newValue = enums.DeviceOrientation.unknown;
                break;
        }
        exports.notify({
            eventName: definition.orientationChangedEvent,
            ios: exports.ios,
            newValue: newValue,
            object: exports.ios,
        });
    }
}
