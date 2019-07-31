import * as examplesVM from "../view-models/examples-model";
import * as exampleInfoPageVM from "../view-models/example-info-page-view-model";
import * as frameModule from "tns-core-modules/ui/frame";
import { isIOS, isAndroid } from "tns-core-modules/platform";
import { getRootView } from "tns-core-modules/application"
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

function traceNavigateTo(to: string, context?: string): string {
    return to;
}

function getFrameForNavigation(): frameModule.Frame {
    return frameModule && frameModule.topmost() || getRootSideDrawer().mainContent as frameModule.Frame
}

function getRootSideDrawer(): RadSideDrawer {
    return getRootView() as RadSideDrawer;
}

export function navigateToExample(example: examplesVM.Example, siblings: examplesVM.Example[]) {
    // prof.start("example");
    // prof.startCPUProfile("example");

    const navContext: exampleInfoPageVM.ExampleNavigationContext = {
        shouldNavigateToInfoOnBack: true,
        example: example,
        siblings: siblings
    }
    const frame = getFrameForNavigation();

    frame.navigate({
        animated: true,
        moduleName: traceNavigateTo(navContext.example.path),
        context: navContext
    });
}

export function navigateToExampleInfo(context: exampleInfoPageVM.ExampleNavigationContext) {
    const infoContext = new exampleInfoPageVM.ExampleInfoPageViewModel(context.example);
    const frame = getFrameForNavigation();

    frame.navigate({
        animated: true,
        context: infoContext,
        moduleName: traceNavigateTo("views/example-info-page", infoContext.currentExample.path)
    });
}

export function navigateToCode(context: examplesVM.Example) {
    const frame = getFrameForNavigation();

    frame.navigate({
        animated: true,
        context: context,
        moduleName: traceNavigateTo("views/code-page", context.path),
    })
}

export function navigateToHome() {
    const frame = getFrameForNavigation();

    if (frame.currentEntry.moduleName !== "views/main-page/main-page") {
        frame.navigate(traceNavigateTo("views/main-page/main-page"));
    }
}

export function navigateToAbout() {
    const frame = getFrameForNavigation();
    
    if (frame.currentEntry.moduleName !== "views/about/about-page") {
        frame.navigate(traceNavigateTo("views/about/about-page"));
    }
}

export function navigateToWhatIsNew() {
    const frame = getFrameForNavigation();
    if (frame.currentEntry.moduleName !== "views/what-is-new-page") {
        frame.navigate(traceNavigateTo("views/what-is-new-page"));
    }
}

export function navigateBack() {
    const frame = getFrameForNavigation();

    frame.goBack();
}

export function navigateBackWithContext(context: any) {
    const frame = getFrameForNavigation();

    var backstackEntry = frame.backStack[frame.backStack.length - 1];
    backstackEntry.entry.context = context;
    frame.goBack(backstackEntry);
}

export function navigateBackFromExample() {
    const frame = getFrameForNavigation();

    var stack = frame.backStack;
    for (var top = stack.length - 1; top >= 0; --top) {
        var backStackEntry = stack[top];
        if (!/^examples\//.test(backStackEntry.entry.moduleName)) {
            frame.goBack(backStackEntry);
            break;
        }
    }
}

export function openLink(view: any) {
    var url = view.tag;
    if (url) {
        if (isIOS) {
            var nsUrl = NSURL.URLWithString(url);
            var sharedApp = UIApplication.sharedApplication;
            if (sharedApp.canOpenURL(nsUrl)) {
                sharedApp.openURL(nsUrl);
            }
        }
        else if (isAndroid) {
            var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url));
            var activity = frameModule.topmost().android.activity;
            activity.startActivity(android.content.Intent.createChooser(intent, "share"));
        }
    }
}