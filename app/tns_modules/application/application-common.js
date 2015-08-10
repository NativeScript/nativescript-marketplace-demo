require("globals");
var definition = require("application");
var fs = require("file-system");
var styleScope = require("ui/styling/style-scope");
var observable = require("data/observable");
var events = new observable.Observable();
global.moduleMerge(events, exports);
exports.launchEvent = "launch";
exports.suspendEvent = "suspend";
exports.resumeEvent = "resume";
exports.exitEvent = "exit";
exports.lowMemoryEvent = "lowMemory";
exports.uncaughtErrorEvent = "uncaughtError";
exports.orientationChangedEvent = "orientationChanged";
exports.cssFile = "app.css";
exports.resources = {};
exports.onUncaughtError = undefined;
exports.onLaunch = undefined;
exports.onSuspend = undefined;
exports.onResume = undefined;
exports.onExit = undefined;
exports.onLowMemory = undefined;
exports.android = undefined;
exports.ios = undefined;
function loadCss() {
    if (definition.cssFile) {
        var cssFileName = fs.path.join(fs.knownFolders.currentApp().path, definition.cssFile);
        if (fs.File.exists(cssFileName)) {
            var file = fs.File.fromPath(cssFileName);
            var applicationCss = file.readTextSync();
            if (applicationCss) {
                definition.cssSelectorsCache = styleScope.StyleScope.createSelectorsFromCss(applicationCss, cssFileName);
            }
        }
    }
}
exports.loadCss = loadCss;
