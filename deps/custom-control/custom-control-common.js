var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var builderModule = require("ui/builder");
var view_1 = require("ui/core/view");
var CustomControl = (function (_super) {
    __extends(CustomControl, _super);
    function CustomControl() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CustomControl.prototype, "_childrenCount", {
        get: function () {
            if (this._template) {
                return 1;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomControl.prototype, "template", {
        get: function () {
            return this._template;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomControl.prototype, "path", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomControl.prototype, "templateName", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    CustomControl.prototype._eachChildView = function (callback) {
        if (this._template) {
            callback(this._template);
        }
    };
    CustomControl.prototype.applyTemplate = function () {
        this._template = builderModule.load({
            path: this.path,
            name: this.templateName,
            exports: this
        });
        this._template.bindingContext = this;
        this.onApplyTemplate(this._template);
        return this._template;
    };
    CustomControl.prototype.onApplyTemplate = function (template) {
    };
    return CustomControl;
})(view_1.View);
exports.CustomControl = CustomControl;
//# sourceMappingURL=custom-control-common.js.map