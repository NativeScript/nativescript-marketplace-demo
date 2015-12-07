## Working With The Repo
The following is information for the core NativeScript team members.

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
