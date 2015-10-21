var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var commonModule = require("./custom-control-common");
var view_1 = require("ui/core/view");
var utils = require("utils/utils");
global.moduleMerge(commonModule, exports);
var CustomControl = (function (_super) {
    __extends(CustomControl, _super);
    function CustomControl() {
        _super.call(this);
        if (!this.template) {
            this.template = this.applyTemplate();
            this._addView(this.template);
        }
        this._ios = this.template._nativeView;
    }
    Object.defineProperty(CustomControl.prototype, "ios", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomControl.prototype, "_nativeView", {
        get: function () {
            return this._ios;
        },
        enumerable: true,
        configurable: true
    });
    CustomControl.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var result = view_1.View.measureChild(this, this.template, widthMeasureSpec, heightMeasureSpec);
        var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = utils.layout.getMeasureSpecMode(widthMeasureSpec);
        var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = utils.layout.getMeasureSpecMode(heightMeasureSpec);
        var density = utils.layout.getDisplayDensity();
        var measureWidth = Math.max(result.measuredWidth, this.minWidth * density);
        var measureHeight = Math.max(result.measuredHeight, this.minHeight * density);
        var widthAndState = view_1.View.resolveSizeAndState(measureWidth, width, widthMode, 0);
        var heightAndState = view_1.View.resolveSizeAndState(measureHeight, height, heightMode, 0);
        this.setMeasuredDimension(widthAndState, heightAndState);
    };
    CustomControl.prototype.onLayout = function (left, top, right, bottom) {
        view_1.View.layoutChild(this, this.template, left, top, right, bottom);
    };
    return CustomControl;
})(commonModule.CustomControl);
exports.CustomControl = CustomControl;
//# sourceMappingURL=custom-control.ios.js.map