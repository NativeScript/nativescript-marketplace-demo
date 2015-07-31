import examplesVM = require("../view-models/examples-view-model")
import frame = require("ui/frame");

export function navigateToExampleGroup(exampleGroup: examplesVM.ExampleGroup) {
    frame.topmost().navigate({
        animated: true,
        context: exampleGroup,
        moduleName: "views/example-group-page",
    })
}

export function navigateToExample(example: examplesVM.Example) {
    frame.topmost().navigate({
        animated: true,
        context: example,
        moduleName: "views/example-page",
    })
}

export function navigateBack() {
    frame.goBack();
}