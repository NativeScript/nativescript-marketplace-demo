import utils = require("utils/utils");
import platform = require("platform");
import * as navigator from "../common/navigator";

var OVERLAY_ELEVATION = 12;
var CURVE = (platform.device.os === platform.platformNames.android) ? new android.view.animation.AccelerateDecelerateInterpolator() : UIViewAnimationCurve.UIViewAnimationCurveEaseInOut;

export function toggleDrawerState(args) {
	var drawer = args.object.page.getViewById("example-menu-drawer");
	drawer.toggleDrawerState();
}

export function menuButtonLoaded(args) {
	var overlay = args.object;

	var scale = (scale, duration: number = 120) => () => overlay.animate({
		scale: { x: scale, y: scale },
		duration: duration,
		curve: CURVE
	});

	scale(0, 1)()
		.then(scale(2))
		.then(scale(0.8))
		.then(scale(1.7))
		.then(scale(0.9))
		.then(scale(1.4))
		.then(scale(1));

	if (overlay.android) {
		var compat = <any>android.support.v4.view.ViewCompat;
		if (compat.setElevation) {
			compat.setElevation(overlay.android, OVERLAY_ELEVATION * utils.layout.getDisplayDensity());
		}
	}
}

export function drawerLoaded(args) {
	var drawer = args.object;
	if (!drawer.autoCloseAssigned) {
		drawer.autoCloseAssigned = true;
		drawer.page.on("navigatedFrom", (args) => {
			drawer.closeDrawer();
		});
		
		if (drawer.ios) {
			drawer.ios.defaultSideDrawer.style.shadowMode = TKSideDrawerShadowMode.TKSideDrawerShadowModeSideDrawer;
			drawer.ios.defaultSideDrawer.style.dimOpacity = 0.3;
		}
	}
}

export function backTap(args) {
	console.log("back");
	navigator.navigateBackFromExample();
}

export function informationTap(args) {
	console.log("info");
	navigator.navigateToExampleInfo(args.object.bindingContext);
}

export function codeTap(args) {
	console.log("code");
	navigator.navigateToCode(args.object.bindingContext.example);
}

export function feedbackTap(args) {
	console.log("feedback");
}

export function prevTap(args) {
	console.log("prev");
	navigator.navigateToPrevExample(args.object.bindingContext);
}

export function nextTap(args) {
	console.log("prev");
	navigator.navigateToNextExample(args.object.bindingContext);
}
