# nativescript-marketplace-demo
Repository used for the NativeScript demo app 

#To Build
Install npm dependencies (currently highlight.js an tns-modules-core):
```
npm install
```

Run typescript compiler(`npm i -g typescript`) inside the `app` folder:
```
tsc -p .
```

#To Run
Use the tns CLI


## To Add Example

Add examples are defined in the `view-models\examples-model.ts` file in the exmaples array. For example
```
title: "Layouts",  
image: "~/images/empty.png",
controls: ["stack-layout", "grid-layout", "wrap-layout", "dock-layout", "absolute-layout"],
path: "examples/layouts/layouts-example", 
info: "Few sentences of example information. Few sentences of example information.",
isFeatured: true,
isNew: true
```
Note: Each control in the controls list should be defined in the `controlInfos` list in the examples-modules.

Design resources: `R:\xPlatCore\Design\Demo` 