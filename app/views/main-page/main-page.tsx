import * as observable from "data/observable";
import { Page } from "ui/page";
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
import * as platform from "platform";
import { Image } from "ui/image";
import { Label } from "ui/label";
import { GridLayout } from "ui/layouts/grid-layout";
import { WrapLayout } from "ui/layouts/wrap-layout";
import { LayoutBase } from "ui/layouts/layout-base";
import { RadSideDrawer } from "nativescript-pro-ui/sidedrawer";
import { onAfterIntro } from "../../common/firebase";
import { ActionBar } from "ui/action-bar";
import { UIBuilder } from "nativescript-tsx";
import { isIOS, isAndroid } from "platform";
import { ScrollView } from "ui/scroll-view";
import { Repeater } from "ui/repeater";
import { Button } from "ui/button";

export function loaded(args) {
    prof.stop("main-page");
    let page = (args.object as View).page as Page;
    setTimeout(() => (page as any).canEnter = true, 3500);
    if (!(page as any).introStarted) {
        trackEvent("main-page: play intro");
        (page as any).introStarted = true;
    }
    if (platform.device.os === platform.platformNames.ios) {
        let examplesList = page.getViewById("examples-wrap-layout") as LayoutBase;
        for (let i = 0, length = examplesList.getChildrenCount(); i < length; i++){
             examplesList.getChildAt(i).ios.layer.masksToBounds = true;
        }
    }
    
    // To allow the intro things to appear under the ActionBar:
    GridLayout.setRow(page.content, 0);
    GridLayout.setRowSpan(page.content, 2);
}

export function navigatingTo(args: observable.EventData) {
    (args.object as View).bindingContext = mainPageVM.instance;
}

export function toggleWrapLayout(e: any) {
    e.object.bindingContext.toggleWrapLayout();
}

export function navigateToExampleGroup(args: gestures.GestureEventData) {
    prof.start("group");
    let page = (args.object as View).page as Page;
    (page.getViewById("side-drawer") as RadSideDrawer).closeDrawer();
    var exampleGroup = (args as any).object.bindingContext as examplesVM.ExampleGroup;
    var context = new groupPageVM.GroupPageViewModel(exampleGroup);
    navigator.navigateToExampleGroup(context);
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
    (page.getViewById("side-drawer") as RadSideDrawer).closeDrawer();
    var example = (args as any).object.bindingContext as examplesVM.Example;
    navigator.navigateToExample(example, examplesVM.featuredExamples);
}

export function showSlideout(args) {
    let page = (args.object as View).page as Page;
    (page.getViewById("side-drawer") as RadSideDrawer).toggleDrawerState();
}

export function tapHome(args) {
    let page = (args.object as View).page as Page;
    (page.getViewById("side-drawer") as RadSideDrawer).closeDrawer();
}

export function tapAbout(args) {
    let page = (args.object as View).page as Page;
    (page.getViewById("side-drawer") as RadSideDrawer).closeDrawer();
    navigator.navigateToAbout();
}

export function tapDrawerLink(args) {
    let page = (args.object as View).page as Page;
    (page.getViewById("side-drawer") as RadSideDrawer).closeDrawer();
    navigator.openLink(args.object);
}

export function tapPage(args) {
    enter(args, "main-page: enter: page tap");
}

export function tapGetStarted(args) {
    enter(args, "main-page: enter: get started tap");
}

export function enter(args, event) {
    let page = (args.object as View).page as Page;
    if (!(page as any).canEnter) {
        return;
    }
    if ((page as any).entered) {
        return;
    }
    trackEvent(event);
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

export const createPage = () => {
    const itemsLayout = <WrapLayout id="examples-wrap-layout"
        horizontalAlignment="left"
        itemWidth={isAndroid ? "{{ (screenWidth - 20) / 2 }}" : "{{ (screenWidth - 12) / 2 }}"}
        itemHeight={isAndroid ? "{{ (screenWidth - 20) * 0.5 + 50 }}" : "{{ (screenWidth - 12) * 0.5 + 50 }}"} />

    const itemTemplate = () => <GridLayout className="example-intro" margin="6" rows="* 54" backgroundColor="white" touch="tileTouch" tap="navigateToExample" automationText="{{ title }}">
            <Image src="{{ image }}" stretch="aspectFill" />
            <Label row="1" textWrap="true" horizontalAlignment="center" verticalAlignment="center" text="{{ title }}" className="example-label" />
            <Image src="res://ic_new" visibility="{{ isNew ? 'visible' : 'collapsed' }}" stretch="none" className="example-new" />
        </GridLayout>;

    const mainContent = <GridLayout>
        <GridLayout className="page-content">
            <ScrollView id="content" opacity={0}>
                <GridLayout>
                    <Repeater items="{{ featuredExamples }}" margin={isAndroid ? 10 : 6} itemsLayout itemTemplate />
                </GridLayout>
            </ScrollView>
        </GridLayout>

        <GridLayout id="intro-elements" tap="enter">
            <GridLayout id="intro-background" class="intro-background-intro" originY="0"/>
            
            <GridLayout id="intro-logo-bg" class="intro-logo-bg-intro" backgroundColor="#3C5AFD" width="93" height="93" horizontalAlignment="center" verticalAlignment="center" borderRadius="20" />
            <GridLayout id="intro-logo-n" class="intro-logo-n-intro" backgroundImage="res://logo_blue_bg" width="93" height="93" horizontalAlignment="center" verticalAlignment="center" />
            <GridLayout id="intro-logo-ns" class="intro-logo-ns-intro" backgroundImage="res://logo_text" width="199" height="31" horizontalAlignment="center" verticalAlignment="center" margin="160 0 0 0" />

            <Label id="intro-text-one"
                    class="intro-text-one-intro"
                    text="Build truly&#xA;native apps with&#xA;JavaScript"
                    fontSize="37"
                    horizontalAlignment="center"
                    verticalAlignment="center"
                    textWrap="true"
                    color="white"
                    textAlignment="center" />
            <Label id="intro-text-two"
                    class="intro-text-two-intro"
                    text="Develop native cross platform&#xA;apps from a single code base"
                    fontSize="19"
                    horizontalAlignment="center"
                    verticalAlignment="center"
                    textWrap="true"
                    color="#8DA1AB"
                    textAlignment="center" />

            <Button id="intro-get-started"
                    class="intro-get-started-intro"
                    text="GET STARTED"
                    backgroundColor="#1DBE67"
                    color="white"
                    borderRadius="25"
                    height="50"
                    width="234"
                    fontSize="18"
                    tap="tapGetStarted"/>
            <Label id="intro-version"
                    class="intro-version-intro"
                    text="version 3.2.0"
                    fontSize="14"
                    horizontalAlignment="center"
                    verticalAlignment="center"
                    color="white"
                    textAlignment="center" />
        </GridLayout>
    </GridLayout>;

    const page = <Page
            className="qsf-page"
            navigatingTo
            loaded
            backgroundSpanUnderStatusBar="true"
            actionBarHidden={isIOS}
            tap={tapPage}>
        <ActionBar automationText="ActionBar" opacity={isAndroid ? 0 : 1}>
            <Image id="actionbar-logo" src="res://logo_main" stretch="none" horizontalAlignment="center" verticalAlignment="center" />
        </ActionBar>
        <RadSideDrawer drawerContent mainContent />
    </Page>;
    return page;
}
