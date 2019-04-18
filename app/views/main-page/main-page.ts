import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { LayoutBase } from "tns-core-modules/ui/layouts/layout-base";
import * as gestures from "tns-core-modules/ui/gestures";
import * as examplesVM from "../../view-models/examples-model"
import * as mainPageVM from "../../view-models/main-page-view-model";
import * as navigator from "../../common/navigator";
import * as prof from "../../common/profiling";
import { View } from "tns-core-modules/ui/core/view";
import { grayTouch } from "../../common/effects";
import { onAfterIntro } from "../../common/firebase";
import { isIOS } from "tns-core-modules/platform";
import { getRootView } from "tns-core-modules/application"

export function onLoaded(args) {
    prof.stop("main-page");
    let page = (args.object as View).page as Page;

    setTimeout(() => {
        (page as any).canEnter = true;
    }, 3500);
}

export function onNavigatingTo(args: EventData) {
    (args.object as View).bindingContext = mainPageVM.getInstance();
}

export function toggleWrapLayout(e: any) {
    e.object.bindingContext.toggleWrapLayout();
}

export function tileTouch(args: gestures.TouchGestureEventData) {
    let page = (args.object as View).page as Page;
    if (!(page as any).introPlayed) {
        return;
    }
    grayTouch(args);
}

export function navigateToExample(args: gestures.GestureEventData) {
    let page = (args.object as View).page as Page;
    if (!(page as any).introPlayed) {
        return;
    }
    prof.start("example");

    getRootSideDrawer().closeDrawer();

    var example = (args as any).object.bindingContext as examplesVM.Example;
    navigator.navigateToExample(example, examplesVM.featuredExamples);
}

export function showSlideout() {
    getRootSideDrawer().toggleDrawerState();
}

export function tapHome() {
    getRootSideDrawer().closeDrawer();
}

export function tapAbout() {
    getRootSideDrawer().closeDrawer();
    navigator.navigateToAbout();
}

export function tapDrawerLink(args) {
    getRootSideDrawer().closeDrawer();
    navigator.openLink(args.object);
}

export function tapPage(args) {
    enter(args);
}

export function tapGetStarted(args) {
    enter(args);
}

export function enter(args) {
    let page = (args.object as View).page as Page;
    if (!(page as any).canEnter) {
        return;
    }
    if ((page as any).entered) {
        return;
    }
    (page as any).entered = true;
    let content = page.getViewById<View>("content");
    content.isEnabled = true;
    content.opacity = 1;
    startEnterAnimation(page);
    startExamplesAnimation(page);
    setTimeout(() => {
        page.getViewById<View>("intro-elements").visibility = "collapse";
        onAfterIntro();
    }, 1500);
    showActionBar(page);
}

function getRootSideDrawer(): RadSideDrawer {
    return getRootView() as RadSideDrawer;
}

function startEnterAnimation(page: Page) {
    ["intro-background", "intro-logo-bg", "intro-logo-n", "intro-logo-ns", "intro-text-one", "intro-text-two", "intro-get-started", "intro-version"]
        .forEach(id => page.getViewById(id).className = id + "-enter");
}
function startExamplesAnimation(page: Page) {
    let examplesList = page.getViewById("examples-wrap-layout") as LayoutBase;
    let odd = true;
    let timeout = 1000;
    setTimeout(() => (page as any).introPlayed = true, timeout);
    let classSetterFactory = (child, className) => () => child.className = className;

    for (let i = 0, length = examplesList.getChildrenCount(); i < length; i++) {
        let child = examplesList.getChildAt(i);
        setTimeout(classSetterFactory(child, odd ? "example-odd-enter" : "example-even-enter"), timeout);
        setTimeout(classSetterFactory(child, ""), timeout + 400);
        if (odd = !odd) {
            timeout += 220;
        }
    }
}
function showActionBar(page: Page) {
    var introElements = page.getViewById<View>("intro-elements");
    if (isIOS) {
        setTimeout(() => {
            introElements.margin = "-44 0 0 0";
            page.actionBarHidden = false;
        }, 300);
    }
    else {
        setTimeout(() => {
            console.log("Animate android actionbar...");
            page.actionBar.animate({
                opacity: 1,
                duration: 200
            });
        }, 300);
    }
}
