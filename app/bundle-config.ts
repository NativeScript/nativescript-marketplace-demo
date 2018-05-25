if ((<any>global).TNS_WEBPACK) {
    // Register tns-core-modules UI framework modules
    require("bundle-entry-points");

    // Register application modules
    // This will register each `root`, `page`, `fragment` postfixed xml, css, js, ts, scss file in the app/ folder
    const context = (<any>require).context("~/", true, /(root|page|fragment|common)\.(xml|css|js|ts|scss|less|sass)$/);
    global.registerWebpackModules(context);

    global.registerModule("examples/chart/area-series", () => require("./examples/chart/area-series"));
    global.registerModule("examples/chart/bar-series", () => require("./examples/chart/bar-series"));
    global.registerModule("examples/chart/line-series", () => require("./examples/chart/line-series"));
    global.registerModule("examples/chart/pie-series", () => require("./examples/chart/pie-series"));
    global.registerModule("examples/chart/view-model", () => require("./examples/chart/view-model"));
    global.registerModule("examples/conference-agenda/conference-agenda-example", () => require("./examples/conference-agenda/conference-agenda-example"));
    global.registerModule("examples/conference-agenda/conference-view-model", () => require("./examples/conference-agenda/conference-view-model"));
    global.registerModule("examples/example-menu", () => require("./examples/example-menu"));
    global.registerModule("examples/listview/layouts/layouts-view-model", () => require("./examples/listview/layouts/layouts-view-model"));
    global.registerModule("examples/listview/layouts/listview-layouts", () => require("./examples/listview/layouts/listview-layouts"));
    global.registerModule("examples/listview/reorder/listview-reorder-model", () => require("./examples/listview/reorder/listview-reorder-model"));
    global.registerModule("examples/listview/reorder/listview-reorder", () => require("./examples/listview/reorder/listview-reorder"));
    global.registerModule("examples/listview/selection/selection-view-model", () => require("./examples/listview/selection/selection-view-model"));

    global.registerModule("views/side-drawer-content/side-drawer-content", () => require("./views/side-drawer-content/side-drawer-content"));

    global.registerModule("ui/page", () => require("ui/page"))
    global.registerModule("ui/action-bar", () => require("ui/action-bar"))
    global.registerModule("ui/layouts/absolute-layout", () => require("ui/layouts/absolute-layout"))
    global.registerModule("ui/activity-indicator", () => require("ui/activity-indicator"))
    global.registerModule("ui/border", () => require("ui/border"))
    global.registerModule("ui/button", () => require("ui/button"))
    global.registerModule("ui/content-view", () => require("ui/content-view"))
    global.registerModule("ui/date-picker", () => require("ui/date-picker"))
    global.registerModule("ui/layouts/dock-layout", () => require("ui/layouts/dock-layout"))
    global.registerModule("ui/layouts/grid-layout", () => require("ui/layouts/grid-layout"))
    global.registerModule("ui/html-view", () => require("ui/html-view"))
    global.registerModule("ui/image", () => require("ui/image"))
    global.registerModule("ui/label", () => require("ui/label"))
    global.registerModule("ui/list-picker", () => require("ui/list-picker"))
    global.registerModule("ui/list-view", () => require("ui/list-view"))
    global.registerModule("ui/placeholder", () => require("ui/placeholder"))
    global.registerModule("ui/progress", () => require("ui/progress"))
    global.registerModule("ui/proxy-view-container", () => require("ui/proxy-view-container"))
    global.registerModule("ui/repeater", () => require("ui/repeater"))
    global.registerModule("ui/scroll-view", () => require("ui/scroll-view"))
    global.registerModule("ui/search-bar", () => require("ui/search-bar"))
    global.registerModule("ui/segmented-bar", () => require("ui/segmented-bar"))
    global.registerModule("ui/slider", () => require("ui/slider"))
    global.registerModule("ui/layouts/stack-layout", () => require("ui/layouts/stack-layout"))
    global.registerModule("ui/switch", () => require("ui/switch"))
    global.registerModule("ui/tab-view", () => require("ui/tab-view"))
    global.registerModule("ui/text-field", () => require("ui/text-field"))
    global.registerModule("ui/text-view", () => require("ui/text-view"))
    global.registerModule("ui/time-picker", () => require("ui/time-picker"))
    global.registerModule("ui/web-view", () => require("ui/web-view"))
    global.registerModule("ui/layouts/wrap-layout", () => require("ui/layouts/wrap-layout"))
    global.registerModule("text/formatted-string", () => require("text/formatted-string"))
    global.registerModule("text/span", () => require("text/span"))
    global.registerModule("ui/proxy-view-container", () => require("ui/proxy-view-container"))

    global.registerModule("nativescript-ui-sidedrawer", () => require("nativescript-ui-sidedrawer"))
    global.registerModule("nativescript-ui-chart", () => require("nativescript-ui-chart"))
    global.registerModule("nativescript-ui-listview", () => require("nativescript-ui-listview"))
    global.registerModule("nativescript-ui-dataform", () => require("nativescript-ui-dataform"))

    global.registerModule("nativescript-fresco/nativescript-fresco", () => require("nativescript-fresco/nativescript-fresco"))
}
