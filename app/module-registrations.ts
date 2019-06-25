
if (global.TNS_WEBPACK) {
    // Register nativescript-ui-chart since it is loaded dynamically 
    global.registerModule("nativescript-ui-chart", function () { return require("nativescript-ui-chart"); });
    global.registerModule("nativescript-ui-listview", function () { return require("nativescript-ui-listview"); });
}