var Analytics = require("nativescript-telerik-analytics");
var enabled: boolean = false;

export function start(): void {
    //TODO: inject analyticsAppId via the webpack config and enable analytics
    // when bundled
    if (!global.TNS_WEBPACK) {
        var packageJson = require("../package.json");
        if (packageJson.analyticsAppId) {
            var Analytics = require("nativescript-telerik-analytics");
            Analytics.init({
                appId: packageJson.analyticsAppId,
                logger: {
                    info: msg => console.info("Analytics: " + msg),
                    error: msg => console.error("Analytics: " + msg)
                }
            });

            Analytics.start();
            enabled = true;
        }
    }
}

export function trackEvent(feature: string): void {
    if (!enabled) {
        return;
    }
    Analytics.trackEvent(feature);
}

export function trackTimingRaw(feature: string, time: number) {
    if (!enabled) {
        return;
    }
    Analytics.trackTimingRaw(feature, time);
}

export function trackTimingStart(feature: string): TimeToken {
    if (!enabled) {
        return;
    }
    return Analytics.trackTimingStart(feature);
}

export function trackException(e: Error, context: string): TimeToken {
    if (!enabled) {
        return;
    }
    Analytics.trackException(e, context);
}

export interface TimeToken {
    stop: () => void;
}
