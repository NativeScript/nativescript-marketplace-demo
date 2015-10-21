import commonModule = require("./custom-control-common");
import { View } from "ui/core/view";

global.moduleMerge(commonModule, exports);

var ANDROID = "_android";
var NATIVE_VIEW = "_nativeView";
var VIEW_GROUP = "_viewGroup";
var OWNER = "_owner";

export class CustomControl extends commonModule.CustomControl {
    private _android: android.view.View;

    get android(): android.view.View {
        return this._android;
    }

    get _nativeView(): android.view.View {
        return this._android;
    }

    public _createUI() {
        this.template = this.applyTemplate();
        this._addView(this.template);
        this._android = (<any>this.template)._nativeView;
    }

    public _clearAndroidReference() {
        // Widgets like buttons and such have reference to their native view in both properties.
        if (this[NATIVE_VIEW] === this[ANDROID]) {
            this[NATIVE_VIEW] = undefined;
        }

        // Handle layout and content view
        if (this[VIEW_GROUP] === this[ANDROID]) {
            this[VIEW_GROUP] = undefined;
        }

        this[ANDROID] = undefined;

        this._removeView(this.template);
        this.template = null;
    }
}