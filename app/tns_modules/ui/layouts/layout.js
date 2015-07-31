var view = require("ui/core/view");
var dependencyObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");
function onClipToBoundsPropertyChanged(data) {
    var nativeView = data.object._nativeView;
    if (!nativeView) {
        return;
    }
    var value = data.newValue;
    if (nativeView instanceof UIView) {
        nativeView.clipsToBounds = value;
    }
    else if (nativeView instanceof android.view.ViewGroup) {
        nativeView.setClipChildren(value);
    }
}
var clipToBoundsProperty = new dependencyObservable.Property("clipToBounds", "Layout", new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, onClipToBoundsPropertyChanged));
var Layout = (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        _super.apply(this, arguments);
        this._subViews = new Array();
    }
    Layout.prototype._addChildFromBuilder = function (name, value) {
        if (value instanceof view.View) {
            this.addChild(value);
        }
    };
    Layout.prototype.getChildrenCount = function () {
        return this._subViews.length;
    };
    Object.defineProperty(Layout.prototype, "_childrenCount", {
        get: function () {
            return this._subViews.length;
        },
        enumerable: true,
        configurable: true
    });
    Layout.prototype.getChildAt = function (index) {
        return this._subViews[index];
    };
    Layout.prototype.getChildIndex = function (child) {
        return this._subViews.indexOf(child);
    };
    Layout.prototype.getChildById = function (id) {
        return view.getViewById(this, id);
    };
    Layout.prototype.addChild = function (child) {
        this._addView(child);
        this._subViews.push(child);
    };
    Layout.prototype.insertChild = function (atIndex, child) {
        this._addView(child);
        this._subViews.splice(atIndex, 0, child);
    };
    Layout.prototype.removeChild = function (child) {
        this._removeView(child);
        var index = this._subViews.indexOf(child);
        this._subViews.splice(index, 1);
    };
    Layout.prototype._eachChildView = function (callback) {
        var i;
        var length = this._subViews.length;
        var retVal;
        for (i = 0; i < length; i++) {
            retVal = callback(this._subViews[i]);
            if (retVal === false) {
                break;
            }
        }
    };
    Object.defineProperty(Layout.prototype, "paddingTop", {
        get: function () {
            return this.style.paddingTop;
        },
        set: function (value) {
            this.style.paddingTop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layout.prototype, "paddingRight", {
        get: function () {
            return this.style.paddingRight;
        },
        set: function (value) {
            this.style.paddingRight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layout.prototype, "paddingBottom", {
        get: function () {
            return this.style.paddingBottom;
        },
        set: function (value) {
            this.style.paddingBottom = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layout.prototype, "paddingLeft", {
        get: function () {
            return this.style.paddingLeft;
        },
        set: function (value) {
            this.style.paddingLeft = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layout.prototype, "clipToBounds", {
        get: function () {
            return this._getValue(Layout.clipToBoundsProperty);
        },
        set: function (value) {
            this._setValue(Layout.clipToBoundsProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Layout.clipToBoundsProperty = clipToBoundsProperty;
    return Layout;
})(view.CustomLayoutView);
exports.Layout = Layout;
