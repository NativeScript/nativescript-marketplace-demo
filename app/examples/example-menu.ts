import * as navigator from "../common/navigator";
import { loadedGuard } from "../common/effects";

var isAndroid: boolean = platform.device.os === platform.platformNames.android;

var OVERLAY_ELEVATION = 12;
var CURVE = (platform.device.os === platform.platformNames.android) ? new android.view.animation.AccelerateDecelerateInterpolator() : UIViewAnimationCurve.EaseInOut;

export function openDrawer(args) {
	var drawer = args.object.page.getViewById("example-menu-drawer");
	drawer.gesturesEnabled = true;
	drawer.showDrawer();
}

export function closeDrawer(args) {
	var drawer = args.object.page.getViewById("example-menu-drawer");
	drawer.gesturesEnabled = false;
	drawer.closeDrawer();
}

export function menuButtonLoaded(args) {
	var menuBackground = args.object.getViewById("menu-button-background");

	var timeFactor = isAndroid ? 0.4 : 0.6;
	var scaleFactor = (s) => 1 * 0.4 + s * 0.6;

	var animateBackground = (scale, opacity, duration: number = 120) => () => menuBackground.animate({
		scale: { x: scaleFactor(scale), y: scaleFactor(scale) },
		opacity: opacity,
		duration: duration * timeFactor,
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
	setTimeout(loadedGuard(menuDots, () => menuDots.animate({
		translate: { x: 0, y: 0 },
		opacity: 1,
		duration: 500 * timeFactor,
		curve: CURVE
	})), 300);

	var title = args.object.getViewById("menu-button-title");
	setTimeout(loadedGuard(title, () => title.animate({
		translate: { x: 0, y: 0 },
		opacity: 1,
		duration: 450 * timeFactor,
		curve: CURVE
	})), 430);

	var menuButton = args.object.getViewById("menu-button");
	if (args.object.android) {
		var compat = (<any>android.support.v4).view.ViewCompat;
		var baseElevation = OVERLAY_ELEVATION * utils.layout.getDisplayDensity() + 1000;
		var setElevation = (view, elev) => {
			compat.setElevation(view.android, elev);
		}

		setElevation(menuButton, 4 * utils.layout.getDisplayDensity() + 1);

		setElevation(menuBackground, baseElevation);
		setElevation(menuDots, baseElevation + 1);
		setElevation(title, baseElevation + 1);
	}
}

export function drawerClosed(args) {
	const drawer = <RadSideDrawer>args.object;
	drawer.gesturesEnabled = false;
}

export function drawerLoaded(args) {
	const drawer = <RadSideDrawer>args.object;
	drawer.gesturesEnabled = false;

	if (!drawer.autoCloseAssigned) {
		drawer.autoCloseAssigned = true;
		drawer.page.on("navigatedFrom", () => {
			drawer.closeDrawer();
		});

		if (drawer.ios) {
			drawer.ios.defaultSideDrawer.style.shadowMode = TKSideDrawerShadowMode.SideDrawer;
			drawer.ios.defaultSideDrawer.style.dimOpacity = 0.3;

			// Fixing strange behavior when drawer is not respecting drawerContentSize 
			setTimeout(() => { drawer.drawerContent.requestLayout() }, 0);
		}
	}
}

export function backTap() {
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

export function prevTap(args) {
	console.log("prev");
	navigator.navigateToPrevExample(args.object.bindingContext);
}

export function nextTap(args) {
	console.log("prev");
	navigator.navigateToNextExample(args.object.bindingContext);
}
