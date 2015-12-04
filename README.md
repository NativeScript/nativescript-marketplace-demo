# Examples NativeScript
Repository used for the **Examples NativeScript** app.

## Building The App
You should setup [the NativeScript CLI](https://docs.nativescript.org/setup/quick-setup) with its dependencies.

Clone the repo.

Build and run using:

```
tns run ios --emulator --device iPhone\ 6
tns run android
```

## Adding Examples
All examples are defined in the `view-models\examples-model.ts`. The main model is defined in 3 arrays:
 - `controlInfos` - information about each compnent - name, description, link to docs, etc.
 - `examples` - the actual definitions of each example. 
 - `exampleGroups` - defines the grouping of examples - visible in the "All Controls" section in the main page. Navigating to example group should show all examples that contain controls defined in that group.

*Note:* Each control in the controls list should be defined in the `controlInfos` list in the examples-modules. There is a runtime check that checks the integrity of the model.

Its recommended that all files related to the example are placed in a subfolder inside `app\examples`. All files in the example folder will be availabe for vewing in the code view.