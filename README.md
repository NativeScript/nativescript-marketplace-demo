# Examples NativeScript
Repository used for the **Examples NativeScript** app.

## Building The App
You should setup [the NativeScript CLI](https://docs.nativescript.org/setup/quick-setup) with its dependencies.

For a **quick trial** make a shallow clone of the repo and don't worry about the submodules.
This won't get all the history making a smaller download:
```
git clone --depth 1 https://github.com/NativeScript/nativescript-marketplace-demo.git
```

Build and run using the NativeScript CLI commands like:
```
tns run ios --emulator --device iPhone\ 6
tns run android
```

## Working With The Repo
The following is information for the core NativeScript teams.

If you are not member of Telerik, you probably won't have access to the telerik-ui submodules. 
You will have to use the publically available prebuilt binaries.

We are sorry for the inconveninece.

### Clone the Repo, all Submodules and Rebuild
To make a full clone and update the submodules.
```
git clone git@github.com:NativeScript/nativescript-marketplace-demo.git
git submodule update --init
```

Build the core NativeScript Module from source.
```
grunt prepare
```
This will regenerate the `deps/tns-core-modules.tgz`.

### Adding Examples
All examples are defined in the `view-models\examples-model.ts`. The main model is defined in 3 arrays:
 - `controlInfos` - information about each compnent - name, description, link to docs, etc.
 - `examples` - the actual definitions of each example. 
 - `exampleGroups` - defines the grouping of examples - visible in the "All Controls" section in the main page. Navigating to example group should show all examples that contain controls defined in that group.

*Note:* Each control in the controls list should be defined in the `controlInfos` list in the examples-modules. There is a runtime check that checks the integrity of the model.

Its recommended that all files related to the example are placed in a subfolder inside `app\examples`. All files in the example folder will be availabe for vewing in the code view.