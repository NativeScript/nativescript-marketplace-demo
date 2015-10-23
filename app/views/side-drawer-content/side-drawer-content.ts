import { ExampleGroup } from "../../view-models/examples-model";
import { GroupPageViewModel } from "../../view-models/group-page-view-model"
import * as navigator from "../../common/navigator"
import { groups } from "../../view-models/examples-model"
import { topmost } from "ui/frame"

export function onLoaded(args) {
    console.log("SideDrawer On loaded!!!");
    args.object.bindingContext = groups;
    console.log("Args: " + args + " " + args.object + " " + args.object.bindingContext);
}

function sideDrawer(): any {
    return topmost().currentPage.getViewById("side-drawer");
}

function closeDrawer() {
    var instance = sideDrawer();
    if (instance) {
        instance.closeDrawer();
    }
}

function toggleDrawerState() {
    var instance = sideDrawer();
    if (instance) {
        instance.toggleDrawerState();
    }
}

export function navigateToExampleGroup(args) {
    closeDrawer();
    var exampleGroup = <ExampleGroup>(<any>args).object.bindingContext;
    var context = new GroupPageViewModel(exampleGroup, false);
    navigator.navigateToExampleGroup(context);
}

export function showSlideout(args) {
    toggleDrawerState();
}

export function tapHome(args) {
    closeDrawer();
    navigator.navigateToHome();
}

export function tapAbout(args) {
    closeDrawer();
    navigator.navigateToAbout();
}

export function tapDrawerLink(args) {
    closeDrawer();
    navigator.openLink(args.object);
}
