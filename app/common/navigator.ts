import examplesVM = require("../view-models/examples-model")
import groupVM = require("../view-models/group-page-view-model")
import examplePageVM = require("../view-models/example-page-view-model");
import frame = require("ui/frame");

export function navigateToExampleGroup(context: groupVM.GroupPageViewModel) {
    frame.topmost().navigate({
        animated: true,
        context: context,
        moduleName: "views/group-page",
    })
}

export function navigateToExample(context: examplePageVM.ExamplePageViewModel) {
    frame.topmost().navigate({
        animated: false,
        context: context,
        moduleName: "views/example-page",
    })
    
    frame.topmost().navigate({
        animated: true,
        moduleName: context.currentExample.path,
    })
}

export function navigateToCode(context: examplesVM.Example) {
    frame.topmost().navigate({
        animated: true,
        context: context,
        moduleName: "views/code-page",
    })
}

export function navigateBack() {
    frame.goBack();
}