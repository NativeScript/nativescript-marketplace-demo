import { AppSync, InstallMode, SyncStatus } from "nativescript-app-sync";
import * as application from "tns-core-modules/application";
import { isIOS } from "tns-core-modules/platform";

// Keep false in source code.
// Set to true only for local testing of app sync updates in staging and production.
const USE_APP_SYNC = false;

// Keep false in source code.
// Set to true only for local testing of app sync updates in production.
const USE_PRODUCTION_KEYS = false;

const APP_SYNC_IOS_STAGING_KEY = "e4VfAHQS1SgFRxdQg2DwQUa94aArOKa4VJnve";
const APP_SYNC_IOS_PRODUCTION_KEY = "vTD6T8AyxEMYP7mXssZ5TGXvC9nAOKa4VJnve";

const APP_SYNC_ANDROID_STAGING_KEY = "zzPoMNbFRV2kKyK8qDF9pWKxyMUjOKa4VJnve";
const APP_SYNC_ANDROID_PRODUCTION_KEY = "BSyKUn5tImYHrRjywjy5bc29am8xOKa4VJnve";

export function init() {
    if (!USE_APP_SYNC) {
        return;
    }

    // Check for updates when the app is resumed
    application.on(application.resumeEvent, () => {
        syncWithAppSyncServer();
    });
}

function syncWithAppSyncServer(): void {
    const deploymentKey = USE_PRODUCTION_KEYS ?
        (isIOS ? APP_SYNC_IOS_PRODUCTION_KEY : APP_SYNC_ANDROID_PRODUCTION_KEY) :
        isIOS ? APP_SYNC_IOS_STAGING_KEY : APP_SYNC_ANDROID_STAGING_KEY;
    AppSync.sync({
        deploymentKey: deploymentKey,
        installMode: InstallMode.ON_NEXT_RESTART,
        mandatoryInstallMode: InstallMode.ON_NEXT_RESUME
    }, (syncStatus: SyncStatus, updateLabel?: string): void => {
        if (syncStatus === SyncStatus.UP_TO_DATE) {
            console.log(`AppSync: up to date${updateLabel ? " - " + updateLabel : ""}`);
        } else if (syncStatus === SyncStatus.UPDATE_INSTALLED) {
            console.log(`AppSync: update installed${updateLabel ? " - " + updateLabel : ""}`);
        }
    })
}