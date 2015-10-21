import examplesVM = require("../view-models/examples-model")
import groupVM = require("../view-models/group-page-view-model")
import exampleInfoPageVM = require("../view-models/example-info-page-view-model");
import frame = require("ui/frame");
import viewModule = require("ui/core/view");
import platform = require("platform");

export function navigateToExampleGroup(context: groupVM.GroupPageViewModel) {
    frame.topmost().navigate({
        animated: true,
        context: context,
        moduleName: "views/group-page",
    })
}

export function navigateToExample(example: examplesVM.Example) {
    var navContext: exampleInfoPageVM.ExampleNavigationContext = {
        shouldNavigateToInfoOnBack: true,
        example: example
    }

    frame.topmost().navigate({
        animated: true,
        moduleName: example.path,
        context: navContext
    })
}

export function navigateBackFromExampe(context: exampleInfoPageVM.ExampleNavigationContext) {
    frame.goBack();
    
    if (context && context.shouldNavigateToInfoOnBack) {
        var infoContext = new exampleInfoPageVM.ExampleInfoPageViewModel(context.example);
        
        frame.topmost().navigate({
            animated: false,
            context: infoContext,
            moduleName: "views/example-info-page",
        });
    }
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

export function navigateToAbout() {
    frame.topmost().navigate("views/about");
}

export function navigateBack() {
    frame.goBack();
}

export function openLink(view: any) {
    var url = view.tag;
    if (url) {
        if (platform.device.os === platform.platformNames.ios) {
            var nsUrl = NSURL.URLWithString(url);
            var sharedApp = UIApplication.sharedApplication();
            if (sharedApp.canOpenURL(nsUrl)) {
                sharedApp.openURL(nsUrl);
            }
        }
        else if (platform.device.os === platform.platformNames.android) {
            var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW, android.net.Uri.parse(url));
            var activity = frame.topmost().android.activity;
            activity.startActivity(android.content.Intent.createChooser(intent, "share"));
        }
    }
}