
if (global.TNS_WEBPACK) {
    // Register tns-core-modules UI framework modules
    global.registerModule("nativescript-ui-chart", function () { return require("nativescript-ui-chart"); });
    // global.registerModule("nativescript-ui-listview", function () { return require("nativescript-ui-listview"); });
    global.registerModule("nativescript-ui-dataform", function () { return require("nativescript-ui-dataform"); });
    global.registerModule("nativescript-image", function () { return require("nativescript-image"); });
}