import { ExampleGroup } from "../../view-models/examples-model";
import { GroupPageViewModel } from "../../view-models/group-page-view-model"
import * as navigator from "../../common/navigator"
import * as gestures from "tns-core-modules/ui/gestures";
import { groups } from "../../view-models/examples-model"
import * as firebase from "../../common/firebase";
import { grayTouch } from "../../common/effects";
import * as application from "tns-core-modules/application";
import { Observable } from "tns-core-modules/data/observable";
import { getRootView } from "tns-core-modules/application"

class SidedrawerViewModel extends Observable {
    public groups = groups;
    public firebase = firebase.viewModel;
}

export function onLoaded(args) {
    args.object.bindingContext = new SidedrawerViewModel();
}

export function tileTouch(args: gestures.TouchGestureEventData) {
    grayTouch(args);
}

function sideDrawer(): any {
    return getRootView();
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
    var context = new GroupPageViewModel(exampleGroup);
    navigator.navigateToExampleGroup(context);
}

export function showSlideout() {
    toggleDrawerState();
}

export function tapHome() {
    closeDrawer();
    navigator.navigateToHome();
}

export function tapAbout() {
    closeDrawer();
    if (application.android) {
        setTimeout(() => navigator.navigateToAbout(), 600);
    } else {
        navigator.navigateToAbout()
    }
}

export function tapWhatIsNew() {
    closeDrawer();
    if (application.android) {
        setTimeout(() => navigator.navigateToWhatIsNew(), 600);
    } else {
        navigator.navigateToWhatIsNew();
    }
}

export function tapDrawerLink(args) {
    closeDrawer();
    navigator.openLink(args.object);
}
