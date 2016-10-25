import examplesVM = require("../view-models/examples-model");
import groupVM = require("../view-models/group-page-view-model");
import exampleInfoPageVM = require("../view-models/example-info-page-view-model");
import frame = require("ui/frame");
import viewModule = require("ui/core/view");
import platform = require("platform");
import prof = require("../common/profiling");
import * as analytics from "./analytics";
import * as utils from "utils/utils";

var isIOS: boolean = platform.device.os === platform.platformNames.ios;
var isAndroid: boolean = platform.device.os === platform.platformNames.android;

function traceNavigateTo(to: string, context?: string): string {
    var eventText = "Navigate to: " + to + (context ? " (" + context + ")" : "");
    console.log("Track: " + eventText);
    analytics.trackEvent(eventText);
    return to;
}

export function navigateToExampleGroup(context: groupVM.GroupPageViewModel) {
    // prof.start("group");

    frame.topmost().navigate({
        animated: true,
        context: context,
        moduleName: traceNavigateTo("views/group-page/group-page"),
    })
}

export function navigateToExample(example: examplesVM.Example, siblings: examplesVM.Example[]) {
    // prof.start("example");
    // prof.startCPUProfile("example");

    var navContext: exampleInfoPageVM.ExampleNavigationContext = {
        shouldNavigateToInfoOnBack: true,
        example: example,
        siblings: siblings
    }

    frame.topmost().navigate({
        animated: true,
        moduleName: traceNavigateTo(navContext.example.path),
        context: navContext
    });
}

export function navigateToNextExample(current: exampleInfoPageVM.ExampleNavigationContext) {
    var index = current.siblings.indexOf(current.example);
    ++index;
    if (index >= current.siblings.length) {
        index = 0;
    }

    var navContext: exampleInfoPageVM.ExampleNavigationContext = {
        shouldNavigateToInfoOnBack: true,
        example: current.siblings[index],
        siblings: current.siblings
    }

    frame.topmost().navigate({
        animated: true,
        moduleName: traceNavigateTo(navContext.example.path),
        context: navContext
    });
}

export function navigateToPrevExample(current: exampleInfoPageVM.ExampleNavigationContext) {
    var index = current.siblings.indexOf(current.example);
    --index;
    if (index < 0) {
        index = current.siblings.length - 1;
    }

    var navContext: exampleInfoPageVM.ExampleNavigationContext = {
        shouldNavigateToInfoOnBack: true,
        example: current.siblings[index],
        siblings: current.siblings
    }

    frame.topmost().navigate({
        animated: true,
        moduleName: traceNavigateTo(navContext.example.path),
        context: navContext
    });
}

export function navigateToExampleInfo(context: exampleInfoPageVM.ExampleNavigationContext) {
    var infoContext = new exampleInfoPageVM.ExampleInfoPageViewModel(context.example);
    frame.topmost().navigate({
        animated: true,
        context: infoContext,
        moduleName: traceNavigateTo("views/example-info-page", infoContext.currentExample.path)
    });
}

export function navigateToCode(context: examplesVM.Example) {
    frame.topmost().navigate({
        animated: true,
        context: context,
        moduleName: traceNavigateTo("views/code-page", context.path),
    })
}

export function navigateToGroupInfo(context: examplesVM.ExampleGroup) {
    frame.topmost().navigate({
        animated: true,
        context: context,
        moduleName: traceNavigateTo("views/group-info-page", context.title),
    })
}

export function navigateToHome() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/main-page/main-page") {
        frame.topmost().navigate(traceNavigateTo("views/main-page/main-page"));
    }
}

export function navigateToAbout() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/about/about") {
        frame.topmost().navigate(traceNavigateTo("views/about/about"));
    }
}

export function navigateBack() {
    frame.goBack();
}

export function navigateBackWithContext(context: any) {
    var topmostFrame = frame.topmost();
    var backstackEntry = topmostFrame.backStack[topmostFrame.backStack.length - 1];
    backstackEntry.entry.context = context;
    topmostFrame.goBack(backstackEntry);
}

export function navigateBackFromExample() {
    var topmostFrame = frame.topmost();
    var stack = topmostFrame.backStack;
    for (var top = stack.length - 1; top >= 0; --top) {
        var backStackEntry = stack[top];
        if (!/^examples\//.test(backStackEntry.entry.moduleName)) {
            topmostFrame.goBack(backStackEntry);
            break;
        }
    }
}

export function openLink(view: any) {
    var url = view.tag;
    if (url) {
        if (isIOS) {
            var nsUrl = NSURL.URLWithString(url);
            var sharedApp = utils.ios.getter(UIApplication, UIApplication.sharedApplication);
            if (sharedApp.canOpenURL(nsUrl)) {
                sharedApp.openURL(nsUrl);
            }
        }
        else if (isAndroid) {
            var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url));
            var activity = frame.topmost().android.activity;
            activity.startActivity(android.content.Intent.createChooser(intent, "share"));
        }
    }
}