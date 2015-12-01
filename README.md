# nativescript-marketplace-demo
Repository used for the NativeScript demo app 

##To Build
Install npm dependencies (currently `highlight.js` and `tns-modules-core`):
```
npm install
```

To rebuild the tns-modules-core from source execute `grunt prepare` or `npm install`.

Use the TNS CLI to run the project.
```
tns run ios --emulator --device iPhone\ 6
tns run android
```

## Examples Model

All examples are defined in the `view-models\examples-model.ts`. The main model is defined in 3 arrays:
 - `controlInfos` - information about each compnent - name, description, link to docs, etc.
 - `examples` - the actual definitions of each example. 
 - `exampleGroups` - defines the grouping of examples - visible in the "All Controls" section in the main page. Navigating to example group should show all examples that contain controls defined in that group.

*Note:* Each control in the controls list should be defined in the `controlInfos` list in the examples-modules. There is a runtime check that checks the integrity of the model.

Its recommended that all files related to the example are placed in a subfolder inside `app\examples`. All files in the example folder will be availabe for vewing in the code view.

Design resources: `R:\xPlatCore\Design\Demo` 