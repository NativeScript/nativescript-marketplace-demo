import * as application from "application";
import "ui/styling/style-scope"; // When required, wires for application events.
global.registerModule("app.css", () => require("~/app"));
global.registerModule("app-common.css", () => require("~/app-common"));
application.loadAppCss();

require("~/views/main-page/main-page");

require("./vendor-platform");
require("bundle-entry-points");
require("highlight.js");

require("nativescript-plugin-firebase");

require("nativescript-pro-ui/chart");
require("nativescript-pro-ui/dataform");
require("nativescript-pro-ui/listview");
require("nativescript-pro-ui/sidedrawer");
