var Analytics = require("nativescript-telerik-analytics");
var enabled: boolean = false;

export function start(): void {
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

export interface TimeToken {
    stop: () => void;
}