# See the NativeScript framework in Action!
This is an app created by the NativeScript team to show the NativeScript framework in action. Run the app on your phone to explore the UX and performance that are delivered using cross platform JavaScript code.

*The app is currently in Beta state, so there maybe some rough edges during execution, please report them to us if you hit one.*

You will find here the most common mobile use cases implemented - Data visualization, Data entry, Charting and native API access. The app contains samples that shows different nuts and bolts from the core NativeScript framework like layouts, buttons, animations and more.

![](https://d2odgkulk9w7if.cloudfront.net/images/default-source/default-album/01-2-home-wrapview.png?sfvrsn=0)
![](https://d2odgkulk9w7if.cloudfront.net/images/default-source/default-album/03-1-layouts-ios.png?sfvrsn=0)

The application also serves as a demo for the paid UI components created by Telerik called "[UI for NativeScript](https://www.npmjs.com/package/nativescript-telerik-ui)".

You can use the application to see NativeScript in action, but also as a learning purpose since the entire source code is available in this repo.

# Install the app on your device directly from the store
[![See NativeScript in Action on Android](https://www.telerik.com/sfimages/default-source/app-store-buttons/googleplay.png?sfvrsn=2)](https://play.google.com/store/apps/details?id=org.nativescript.nativescriptmarketplacedemo&amp;hl=en)
[![See NativeScript in Action on iOS](https://www.telerik.com/sfimages/default-source/app-store-buttons/appstore.png?sfvrsn=2)](https://itunes.apple.com/us/app/examples-nativescript/id1046772499?ls=1&mt=8)

# Run the app from source code
As a prerequisite you should setup [the NativeScript CLI](https://docs.nativescript.org/setup/quick-setup) with its dependencies.

1.Get the source code of the app on your machine:  
```
git clone --depth 1 https://github.com/NativeScript/nativescript-marketplace-demo.git
```
2.Build and run using the NativeScript CLI commands like:  
*for iOS:*
```
tns emulate ios 
```
*for Android, you will need to update to the latest Android SDKs (type ```android``` on your console and then update everything that is reported). After that execute:*
```
tns run android
```

If you have any questions of feebdack please [open an issue](https://github.com/NativeScript/nativescript-marketplace-demo/issues).

Want to see more samples like this one? Check our [NativeScript samples list](http://docs.nativescript.org/samples).

For more news about NativeScript please [follow our twitter account](http://twitter.com/nativescript).
![](https://ga-beacon.appspot.com/UA-111455-24/nativescript/marketplace-demo?pixel) 

# Enable Analytics
Analytics is set in place but requires api key to be enabled.
Just place an `"analyticsAppId": "****************"` key in the `app/package.json`.
For more information check the plugin in npmjs.org: https://www.npmjs.com/package/nativescript-telerik-analytics
