import commonModule = require("./custom-control-common");
import { View } from "ui/core/view";
import utils = require("utils/utils");

global.moduleMerge(commonModule, exports);

export class CustomControl extends commonModule.CustomControl {
    private _ios: any;

    constructor() {
        super();

        if (!this.template) {
            this.template = this.applyTemplate();
            this._addView(this.template);
        }

        this._ios = (<any>this.template)._nativeView;
    }

    get ios(): any {
        return this._ios;
    }

    get _nativeView(): any {
        return this._ios;
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        var result = View.measureChild(this, this.template, widthMeasureSpec, heightMeasureSpec);

        var width = utils.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = utils.layout.getMeasureSpecMode(widthMeasureSpec);

        var height = utils.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = utils.layout.getMeasureSpecMode(heightMeasureSpec);

        var density = utils.layout.getDisplayDensity();
        var measureWidth = Math.max(result.measuredWidth, this.minWidth * density);
        var measureHeight = Math.max(result.measuredHeight, this.minHeight * density);

        var widthAndState = View.resolveSizeAndState(measureWidth, width, widthMode, 0);
        var heightAndState = View.resolveSizeAndState(measureHeight, height, heightMode, 0);

        this.setMeasuredDimension(widthAndState, heightAndState);
    }

    public onLayout(left: number, top: number, right: number, bottom: number): void {
        View.layoutChild(this, this.template, left, top, right, bottom);
    }
}