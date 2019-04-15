import { load } from "tns-core-modules/ui/builder/builder";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";

export function createDrawerContent(args) {
    const radSideDrawer = args.object as RadSideDrawer;
    const radSideDrawerGrid = radSideDrawer.drawerContent as GridLayout;
    if (!radSideDrawerGrid["lateContentAdded"]) {
        const radSideDrawerContent = load({ path: "~/views/side-drawer-content", name: "side-drawer-content", page: radSideDrawer.page });
        radSideDrawerGrid.addChild(radSideDrawerContent);
        radSideDrawerGrid["lateContentAdded"] = true;
    }
}