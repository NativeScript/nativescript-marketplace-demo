import pages = require("ui/page");
import view = require("ui/core/view");
import label = require("ui/label");
import repeater = require("ui/repeater");
import gestures = require("ui/gestures");
import grid = require("ui/layouts/grid-layout");
import observable = require("data/observable");
import animations = require("ui/animation");
import frame = require("ui/frame");
import builder = require("ui/builder");
import navigator = require("../common/navigator");
import examplesVM = require("../view-models/examples-model")
import examplePageVM = require("../view-models/example-info-page-view-model")
import platform = require("platform")
import prof = require("../common/profiling");

var exampleContainerID = "examples-container";
var CURVE = (platform.device.os === platform.platformNames.android) ? new android.view.animation.DecelerateInterpolator(1) : UIViewAnimationCurve.UIViewAnimationCurveEaseIn;

export function pageNavigatingTo(args: pages.NavigatedData) {
    var page = <pages.Page>args.object;
    var vm = <examplePageVM.ExampleInfoPageViewModel>page.navigationContext;
    page.bindingContext = vm;
}

export function showCodeTap(args: observable.EventData) {
    var context = <examplePageVM.ExampleInfoPageViewModel>(<view.View>args.object).bindingContext;
    navigator.navigateToCode(context.currentExample);
}

export function openLink(args: observable.EventData) {
    navigator.openLink(args.object);
}

export function goBack(args: gestures.GestureEventData) {
    navigator.navigateBack();
}
