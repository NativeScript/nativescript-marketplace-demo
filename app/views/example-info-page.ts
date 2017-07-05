import * as pages from "ui/page";
import * as view from "ui/core/view";
import * as label from "ui/label";
import * as repeater from "ui/repeater";
import * as gestures from "ui/gestures";
import * as grid from "ui/layouts/grid-layout";
import * as observable from "data/observable";
import * as animations from "ui/animation";
import * as frame from "ui/frame";
import * as builder from "ui/builder";
import * as navigator from "../common/navigator";
import * as examplesVM from "../view-models/examples-model"
import * as examplePageVM from "../view-models/example-info-page-view-model"
import * as platform from "platform"
import * as prof from "../common/profiling";

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
