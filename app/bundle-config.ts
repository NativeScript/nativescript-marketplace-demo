if ((<any>global).TNS_WEBPACK) {
    // Register tns-core-modules UI framework modules
    require("bundle-entry-points");

    global.registerModule("examples/chart/view-model", () => require("./examples/chart/view-model"));
    global.registerModule("examples/conference-agenda/conference-view-model", () => require("./examples/conference-agenda/conference-view-model"));
    global.registerModule("examples/example-menu", () => require("./examples/example-menu"));

    global.registerModule("examples/listview/layouts/layouts-view-model", () => require("./examples/listview/layouts/layouts-view-model"));
    global.registerModule("examples/listview/reorder/listview-reorder-model", () => require("./examples/listview/reorder/listview-reorder-model"));
    global.registerModule("examples/listview/selection/selection-view-model", () => require("./examples/listview/selection/selection-view-model"));

    global.registerModule("views/side-drawer-content/side-drawer-content", () => require("./views/side-drawer-content/side-drawer-content"));

    global.registerModule("nativescript-ui-sidedrawer", () => require("nativescript-ui-sidedrawer"))
    global.registerModule("nativescript-ui-chart", () => require("nativescript-ui-chart"))
    global.registerModule("nativescript-ui-listview", () => require("nativescript-ui-listview"))
    global.registerModule("nativescript-ui-dataform", () => require("nativescript-ui-dataform"))

    global.registerModule("nativescript-image", () => require("nativescript-image"))
}


// views/side-drawer-content 