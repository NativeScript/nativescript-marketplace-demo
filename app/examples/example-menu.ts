import * as navigator from "../common/navigator";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

export function drawerOpened(args) {
	const drawer = <RadSideDrawer>args.object;
	drawer.gesturesEnabled = true;
}

export function drawerClosed(args) {
	const drawer = <RadSideDrawer>args.object;
	drawer.gesturesEnabled = false;
}

export function drawerLoaded(args) {
	const drawer = <RadSideDrawer>args.object;
	drawer.gesturesEnabled = false;
	if (!drawer["autoCloseAssigned"]) {
		drawer["autoCloseAssigned"] = true;
		drawer.page.on("navigatedFrom", (args) => {
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

export function informationTap(args) {
	console.log("info");
	navigator.navigateToExampleInfo(args.object.bindingContext);
}

export function codeTap(args) {
	console.log("code");
	navigator.navigateToCode(args.object.bindingContext.example);
}
