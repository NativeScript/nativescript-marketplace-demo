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

export function navigateToExample(example: examplesVM.Example) {
    // prof.start("example");
    // prof.startCPUProfile("example");

    var navContext: exampleInfoPageVM.ExampleNavigationContext = {
        shouldNavigateToInfoOnBack: true,
        example: example
    }

    frame.topmost().navigate({
        animated: true,
        moduleName: example.path,
        context: navContext,
        backstackVisible: true
    });
}

export function navigateBackFromExampe(context: exampleInfoPageVM.ExampleNavigationContext) {
 
    if (isAndroid) {
        frame.topmost().goBack();
        var infoContext = new exampleInfoPageVM.ExampleInfoPageViewModel(context.example);
        
        frame.topmost().navigate({
            animated: true,
            context: infoContext,
            moduleName: "views/example-info-page",
            backstackVisible: false
        });
    } else {
        frame.goBack();
    }
// =======
//         backstackVisible: false
//     });
// }

// export function navigateBackFromExampe(context: exampleInfoPageVM.ExampleNavigationContext) {
//     var infoContext = new exampleInfoPageVM.ExampleInfoPageViewModel(context.example);
    
//     frame.topmost().navigate({
//         animated: isAndroid,
//         context: infoContext,
//         moduleName: "views/example-info-page",
//         backstackVisible: false
//     });
// >>>>>>> master
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