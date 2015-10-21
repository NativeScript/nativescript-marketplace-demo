var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var commonModule = require("./custom-control-common");
global.moduleMerge(commonModule, exports);
var ANDROID = "_android";
var NATIVE_VIEW = "_nativeView";
var VIEW_GROUP = "_viewGroup";
var OWNER = "_owner";
var CustomControl = (function (_super) {
    __extends(CustomControl, _super);
    function CustomControl() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CustomControl.prototype, "android", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomControl.prototype, "_nativeView", {
        get: function () {
            return this._android;
        },
        enumerable: true,
        configurable: true
    });
    CustomControl.prototype._createUI = function () {
        this.template = this.applyTemplate();
        this._addView(this.template);
        this._android = this.template._nativeView;
    };
    CustomControl.prototype._clearAndroidReference = function () {
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
    };
    return CustomControl;
})(commonModule.CustomControl);
exports.CustomControl = CustomControl;
//# sourceMappingURL=custom-control.android.js.map