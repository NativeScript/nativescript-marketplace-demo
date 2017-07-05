require("application");
if (!(<any>global).__snapshot) {
    require("ui/frame");
    require("ui/frame/activity");
}
