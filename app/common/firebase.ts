import * as application from "application";
import * as utils from "utils/utils";
import * as dialogs from "ui/dialogs";
import {isAndroid, isIOS} from "platform";
import * as settings from "application-settings";

const enabled = false;

var firebase;
var lastHandledData;

if (enabled) {
    firebase = require("nativescript-plugin-firebase");
    var userGrantedPush = settings.getBoolean("user-granted-push", false);
    if (isAndroid) {
        // Android doesn't ask permissions so go for firebase initialization on launch.
        firebaseInit();
    } else if (userGrantedPush) {
        // For iOS, if the user haven't granted push permissions yet, wait for the intro animation to complete.
        application.on("launch", args => {
            firebaseInit();
        });
    }
}

export function onAfterIntro() {
    // iOS asks for permissions so ask after the intro has played the first time.
    if (isIOS && !settings.getBoolean("user-granted-push", false)) {
        firebaseInit();
    }
}

function firebaseInit() {
    console.log("Firebase init!!!");
    // This will call FIRApp.configure(), it is important to happen early so we can register
    // for remote notifications that we receive while the app is not running (the common case for push notification)
    //setTimeout(() => {
        firebase.init({
            onMessageReceivedCallback(message) {
                console.log("Got message!");
                console.log(JSON.stringify(message));

                let url = (<any>message).url;
                if (url) {
                    if (message.foreground) {
                        dialogs.confirm({
                            title: (<any>message).inAppTitle,
                            message: (<any>message).inAppBody,
                            okButtonText: "Open",
                            cancelButtonText: "Close"
                        }).then(result => {
                            if (result) {
                                utils.openUrl(url);
                            }
                        });
                    } else {
                        if (lastHandledData != url) {
                            utils.openUrl(url);
                            lastHandledData = url;
                        }
                    }
                }
            },
            onPushTokenReceivedCallback(token) {
                console.log("Got token");
                console.log("token: " + token);
                settings.setBoolean("user-granted-push", true);
            }
        }).then(value => {
            console.log("Firebase init done!");
        }).catch(e => {
            console.log("Failed to init firebase. " + e);
            console.log("stack:\n" + e.stack);
        });
    //}, 0);
}
