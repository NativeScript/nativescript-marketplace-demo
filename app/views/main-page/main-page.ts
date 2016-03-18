import observable = require("data/observable");
import pages = require("ui/page");
import frame = require("ui/frame");
import gestures = require("ui/gestures");
import examplesVM = require("../../view-models/examples-model")
import mainPageVM = require("../../view-models/main-page-view-model");
import groupPageVM = require("../../view-models/group-page-view-model");
import examplePageVM = require("../../view-models/example-info-page-view-model");
import navigator = require("../../common/navigator");
import prof = require("../../common/profiling");
import { Color } from "color";
import { View } from "ui/core/view";
import { grayTouch } from "../../common/effects";

var page;

export function pageLoaded(){
    prof.stop("main-page");
}

export function onNavigatingTo(args: observable.EventData) {
    // Get the event sender
    page = <pages.Page>args.object;
    page.bindingContext = mainPageVM.instance;
}

export function toggleWrapLayout(e: any) {
    e.object.bindingContext.toggleWrapLayout();
}

export function navigateToExampleGroup(args: gestures.GestureEventData) {
    prof.start("group");
    page.getViewById("side-drawer").closeDrawer();
    var exampleGroup = <examplesVM.ExampleGroup>(<any>args).object.bindingContext;
    var context = new groupPageVM.GroupPageViewModel(exampleGroup);
    navigator.navigateToExampleGroup(context);
}

export function tileTouch(args: gestures.TouchGestureEventData) {
    grayTouch(args);
}

export function navigateToExample(args: gestures.GestureEventData) {
    prof.start("example");
    page.getViewById("side-drawer").closeDrawer();
    var example = <examplesVM.Example>(<any>args).object.bindingContext;
    navigator.navigateToExample(example, examplesVM.featuredExamples);
}

export function showSlideout(args) {
    page.getViewById("side-drawer").toggleDrawerState();
}

export function tapHome(args) {
    page.getViewById("side-drawer").closeDrawer();
}

export function tapAbout(args) {
    page.getViewById("side-drawer").closeDrawer();
    navigator.navigateToAbout();
}

export function tapDrawerLink(args) {
    page.getViewById("side-drawer").closeDrawer();
    navigator.openLink(args.object);
}

export function enter(args) {
    let page: pages.Page = args.object.page;
    ["intro-background", "intro-logo-bg", "intro-logo-n", "intro-logo-ns", "intro-text-one", "intro-text-two", "intro-get-started"]
        .forEach(id => page.getViewById(id).className = id + "-enter");
    let content = page.getViewById("content");
    content.visibility = "visible";
    let examplesList = page.getViewById("examples-wrap-layout");
    let odd = true;
    let timeout = 1000;
    let classSetterFactory = (child, className) => () => child.className = className;
    examplesList._eachChildView(child => {
        setTimeout(classSetterFactory(child, odd ? "example-odd-enter" : "example-even-enter"), timeout); 
        if (odd = !odd) {
            timeout += 200;
        }
        return true;
    });
    setTimeout(() => page.getViewById("intro-elements").visibility = "collapsed", 1050);
}