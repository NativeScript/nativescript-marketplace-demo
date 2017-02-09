if (global.TNS_WEBPACK) {
    require("bundle-entry-points");
    global.registerModule("ui/layouts/wrap-layout", function () { return require("ui/layouts/wrap-layout"); });

    global.registerModule("examples/chart/area-series", () => require("./examples/chart/area-series"));
    global.registerModule("examples/chart/bar-series", () => require("./examples/chart/bar-series"));
    global.registerModule("examples/chart/line-series", () => require("./examples/chart/line-series"));
    global.registerModule("examples/chart/pie-series", () => require("./examples/chart/pie-series"));
    global.registerModule("examples/chart/view-model", () => require("./examples/chart/view-model"));
    global.registerModule("examples/conference-agenda/conference-agenda-example", () => require("./examples/conference-agenda/conference-agenda-example"));
    global.registerModule("examples/conference-agenda/conference-view-model", () => require("./examples/conference-agenda/conference-view-model"));
    global.registerModule("examples/example-base-page", () => require("./examples/example-base-page"));
    global.registerModule("examples/example-menu", () => require("./examples/example-menu"));
    global.registerModule("examples/layouts/layouts-example", () => require("./examples/layouts/layouts-example"));
    global.registerModule("examples/listview/layouts/layouts-view-model", () => require("./examples/listview/layouts/layouts-view-model"));
    global.registerModule("examples/listview/layouts/listview-layouts", () => require("./examples/listview/layouts/listview-layouts"));
    global.registerModule("examples/listview/reorder/listview-reorder-model", () => require("./examples/listview/reorder/listview-reorder-model"));
    global.registerModule("examples/listview/reorder/listview-reorder", () => require("./examples/listview/reorder/listview-reorder"));
    global.registerModule("examples/listview/selection/detail-page", () => require("./examples/listview/selection/detail-page"));
    global.registerModule("examples/listview/selection/main-page", () => require("./examples/listview/selection/main-page"));
    global.registerModule("examples/listview/selection/selection-view-model", () => require("./examples/listview/selection/selection-view-model"));
    global.registerModule("examples/user-profile/user-profile-example", () => require("./examples/user-profile/user-profile-example"));
    global.registerModule("views/about/about", () => require("./views/about/about"));
    global.registerModule("views/code-page", () => require("./views/code-page"));
    global.registerModule("views/example-info-page", () => require("./views/example-info-page"));
    global.registerModule("views/group-info-page", () => require("./views/group-info-page"));
    global.registerModule("views/group-page/group-page", () => require("./views/group-page/group-page"));
    global.registerModule("views/main-page/main-page", () => require("./views/main-page/main-page"));
    global.registerModule("views/side-drawer-content/side-drawer-content", () => require("./views/side-drawer-content/side-drawer-content"));


    global.registerModule("nativescript-telerik-ui-pro/sidedrawer", () => require("nativescript-telerik-ui-pro/sidedrawer"))
    global.registerModule("nativescript-telerik-ui-pro/sidedrawer/sidedrawer", () => require("nativescript-telerik-ui-pro/sidedrawer/sidedrawer"))
    global.registerModule("nativescript-telerik-ui-pro/sidedrawer/drawerpage", () => require("nativescript-telerik-ui-pro/sidedrawer/drawerpage"))
    global.registerModule("nativescript-telerik-ui-pro/chart", () => require("nativescript-telerik-ui-pro/chart"))
    global.registerModule("nativescript-telerik-ui-pro/listview", () => require("nativescript-telerik-ui-pro/listview"))
}
