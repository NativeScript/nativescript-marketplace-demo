import * as navigator from "../common/navigator";
import { loadedGuard } from "../common/effects";

var isAndroid: boolean = platform.device.os === platform.platformNames.android;

var OVERLAY_ELEVATION = 12;
var CURVE = (platform.device.os === platform.platformNames.android) ? new android.view.animation.AccelerateDecelerateInterpolator() : UIViewAnimationCurve.EaseInOut;

export function openDrawer(args) {
	var drawer = args.object.page.getViewById("example-menu-drawer");
	drawer.gesturesEnabled = true;
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
