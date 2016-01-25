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
	var menuBackground = args.object.getViewById("menu-button-background");

	var animateBackground = (scale, opacity, duration: number = 120) => () => menuBackground.animate({
		scale: { x: scale, y: scale },
		opacity: opacity,
		duration: duration,
		curve: CURVE
	});

	animateBackground(0, 0, 1)()
		.then(animateBackground(2, 0.2))
		.then(animateBackground(0.8, 0.4))
		.then(animateBackground(1.7, 0.6))
		.then(animateBackground(0.9, 0.8))
		.then(animateBackground(1.2, 1))
		.then(animateBackground(1, 1));
	
	var menuDots = args.object.getViewById("menu-button-dots");
	setTimeout(() => menuDots.animate({
		translate: { x: 0, y: 0 },
		opacity: 1,
		duration: 500,
		curve: CURVE
	}), 300);
	
	var title = args.object.getViewById("menu-button-title");
	setTimeout(() => title.animate({
		translate: { x: 0, y: 0 },
		opacity: 1,
		duration: 450,
		curve: CURVE
	}), 430);

	if (args.object.android) {
		var compat = <any>android.support.v4.view.ViewCompat;
		var baseElevation = OVERLAY_ELEVATION * utils.layout.getDisplayDensity() + 1000;
		var setElevation = (view, elev) => {
			compat.setElevation(view.android, elev);
		}
		
		setElevation(menuBackground, baseElevation);
		setElevation(menuDots, baseElevation + 1);
		setElevation(title, baseElevation + 1);
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
