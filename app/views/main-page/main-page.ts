import * as observable from "data/observable";
import * as pages from "ui/page";
import * as frame from "ui/frame";
import * as gestures from "ui/gestures";
import * as examplesVM from "../../view-models/examples-model"
import * as mainPageVM from "../../view-models/main-page-view-model";
import * as groupPageVM from "../../view-models/group-page-view-model";
import * as examplePageVM from "../../view-models/example-info-page-view-model";
import * as navigator from "../../common/navigator";
import * as prof from "../../common/profiling";
import { Color } from "color";
import { View } from "ui/core/view";
import { grayTouch } from "../../common/effects";
import { trackEvent } from "../../common/analytics";
import { Image } from "ui/image";
import * as platform from "platform";
import { GridLayout } from "ui/layouts/grid-layout";
import { LayoutBase } from "ui/layouts/layout-base";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import {onAfterIntro} from "../../common/firebase";

export function pageLoaded(args) {
    prof.stop("main-page");
    let page = <pages.Page>(<View>args.object).page;
    setTimeout(() => (<any>page).canEnter = true, 3500);
    if (!(<any>page).introStarted) {
        trackEvent("main-page: play intro");
        (<any>page).introStarted = true;
    }
    if (platform.device.os === platform.platformNames.ios) {
        let examplesList = <LayoutBase>page.getViewById("examples-wrap-layout");
        for (let i = 0, length = examplesList.getChildrenCount(); i < length; i++){
             examplesList.getChildAt(i).ios.layer.masksToBounds = true;
        }
    }
    
    // To allow the intro things to appear under the ActionBar:
    GridLayout.setRow(page.content, 0);
    GridLayout.setRowSpan(page.content, 2);
}

export function onNavigatingTo(args: observable.EventData) {
    (<View>args.object).bindingContext = mainPageVM.instance;
}

export function toggleWrapLayout(e: any) {
    e.object.bindingContext.toggleWrapLayout();
}

export function navigateToExampleGroup(args: gestures.GestureEventData) {
    prof.start("group");
    let page = <pages.Page>(<View>args.object).page;
    (<RadSideDrawer>page.getViewById("side-drawer")).closeDrawer();
    var exampleGroup = <examplesVM.ExampleGroup>(<any>args).object.bindingContext;
    var context = new groupPageVM.GroupPageViewModel(exampleGroup);
    navigator.navigateToExampleGroup(context);
}

export function tileTouch(args: gestures.TouchGestureEventData) {
    let page = <pages.Page>(<View>args.object).page;
    if (!(<any>page).introPlayed) {
        return;
    }
    grayTouch(args);
}

export function navigateToExample(args: gestures.GestureEventData) {
    let page = <pages.Page>(<View>args.object).page;
    if (!(<any>page).introPlayed) {
        return;
    }
    prof.start("example");
    (<RadSideDrawer>page.getViewById("side-drawer")).closeDrawer();
    var example = <examplesVM.Example>(<any>args).object.bindingContext;
    navigator.navigateToExample(example, examplesVM.featuredExamples);
}

export function showSlideout(args) {
    let page = <pages.Page>(<View>args.object).page;
    (<RadSideDrawer>page.getViewById("side-drawer")).toggleDrawerState();
}

export function tapHome(args) {
    let page = <pages.Page>(<View>args.object).page;
    (<RadSideDrawer>page.getViewById("side-drawer")).closeDrawer();
}

export function tapAbout(args) {
    let page = <pages.Page>(<View>args.object).page;
    (<RadSideDrawer>page.getViewById("side-drawer")).closeDrawer();
    navigator.navigateToAbout();
}

export function tapDrawerLink(args) {
    let page = <pages.Page>(<View>args.object).page;
    (<RadSideDrawer>page.getViewById("side-drawer")).closeDrawer();
    navigator.openLink(args.object);
}

export function tapPage(args) {
    enter(args, "main-page: enter: page tap");
}

export function tapGetStarted(args) {
    enter(args, "main-page: enter: get started tap");
}

export function enter(args, event) {
    let page = <pages.Page>(<View>args.object).page;
    if (!(<any>page).canEnter) {
        return;
    }
    if ((<any>page).entered) {
        return;
    }
    trackEvent(event);
    (<any>page).entered = true;
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
function startEnterAnimation(page: pages.Page) {
    ["intro-background", "intro-logo-bg", "intro-logo-n", "intro-logo-ns", "intro-text-one", "intro-text-two", "intro-get-started", "intro-version"]
        .forEach(id => page.getViewById(id).className = id + "-enter");
}
function startExamplesAnimation(page: pages.Page) {
    let examplesList = <LayoutBase>page.getViewById("examples-wrap-layout");
    let odd = true;
    let timeout = 1000;
    setTimeout(() => (<any>page).introPlayed = true, timeout);
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
function showActionBar(page: pages.Page) {
    var introElements = page.getViewById<View>("intro-elements");
    if (introElements.ios) {
        setTimeout(() => {
            introElements.margin = "-44 0 0 0";
            page.actionBarHidden = false;
        }, 300);
    }
    else {
        setTimeout(() => {
            page.actionBar.animate({
                opacity: 1,
                duration: 200
            });
        }, 300);
    }
}