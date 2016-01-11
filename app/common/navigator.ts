import examplesVM = require("../view-models/examples-model")
import groupVM = require("../view-models/group-page-view-model")
import exampleInfoPageVM = require("../view-models/example-info-page-view-model");
import frame = require("ui/frame");
import viewModule = require("ui/core/view");
import platform = require("platform");
import prof = require("../common/profiling");

var isIOS: boolean = platform.device.os === platform.platformNames.ios;
var isAndroid: boolean = platform.device.os === platform.platformNames.android;

export function navigateToExampleGroup(context: groupVM.GroupPageViewModel) {
    // prof.start("group");

    frame.topmost().navigate({
        animated: true,
        context: context,
        moduleName: "views/group-page/group-page",
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
        moduleName: navContext.example.path,
        context: navContext,
        backstackVisible: true
    });
}

export function navigateToNextExample(current: exampleInfoPageVM.ExampleNavigationContext) {
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
        moduleName: navContext.example.path,
        context: navContext,
        backstackVisible: true
    });
}

export function navigateToPrevExample(current: exampleInfoPageVM.ExampleNavigationContext) {
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
        moduleName: navContext.example.path,
        context: navContext,
        backstackVisible: true
    });
}

export function navigateToExampleInfo(context: exampleInfoPageVM.ExampleNavigationContext) {
    var infoContext = new exampleInfoPageVM.ExampleInfoPageViewModel(context.example);

    frame.topmost().navigate({
        animated: true,
        context: infoContext,
        moduleName: "views/example-info-page"
    });
}

export function navigateToCode(context: examplesVM.Example) {
    frame.topmost().navigate({
        animated: true,
        context: context,
        moduleName: "views/code-page",
    })
}

export function navigateToGroupInfo(context: examplesVM.ExampleGroup) {
    frame.topmost().navigate({
        animated: true,
        context: context,
        moduleName: "views/group-info-page",
    })
}

export function navigateToHome() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/main-page") {
        frame.topmost().navigate("views/main-page");
    }
}

export function navigateToAbout() {
    var topmost = frame.topmost();
    if (topmost.currentEntry.moduleName !== "views/about/about") {
        frame.topmost().navigate("views/about/about");
    }
}

export function navigateBack() {
    frame.goBack();
}

export function navigateBackFromExample() {
    var topmostFrame = frame.topmost();
    var stack = topmostFrame.backStack;
    for (var top = stack.length - 1; top >= 0; --top) {
        topmostFrame.goBack();
        if (!/^examples\//.test(stack[top].entry.moduleName)) {
            // TODO: topmostFrame.goBack(stack[top])
            break;
        }
    }
}

export function openLink(view: any) {
    var url = view.tag;
    if (url) {
        if (isIOS) {
            var nsUrl = NSURL.URLWithString(url);
            var sharedApp = UIApplication.sharedApplication();
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