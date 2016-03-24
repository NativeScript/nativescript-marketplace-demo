import { View } from "ui/core/view";
import { Color } from "color";
import * as platform from "platform";
import * as common from "./linear-gradient-common";

global.moduleMerge(common, exports);

export function drawBackground(view: View, colors: Array<Color>, orientation?: common.Orientation) {
    let nativeView = (<any>view)._nativeView; 
    if (!nativeView)
    {
        throw new Error("Native view is not created yet!");
    }

    let backgroundDrawable = nativeView.getBackground();
    if (!(backgroundDrawable instanceof android.graphics.drawable.GradientDrawable)) {
        backgroundDrawable = new android.graphics.drawable.GradientDrawable();
        nativeView.setBackgroundDrawable(backgroundDrawable);
    }
    
    let LINEAR_GRADIENT = 0;
    let nativeColors = new Array<number>();
    colors.forEach(function(color: Color) {
        nativeColors.push(color.android);
    });
    backgroundDrawable.setColors(nativeColors);
    backgroundDrawable.setGradientType(LINEAR_GRADIENT);
    let androidOrientation = getAndroidOrientation(orientation);
    if (androidOrientation){
        backgroundDrawable.setOrientation(androidOrientation);
    }
}

function getAndroidOrientation(orientation?: common.Orientation){
    switch (orientation) {
        case common.Orientation.TopLeft_BottomRight:
            return android.graphics.drawable.GradientDrawable.Orientation.TL_BR;
        case common.Orientation.Left_Right:
            return android.graphics.drawable.GradientDrawable.Orientation.LEFT_RIGHT;
        case common.Orientation.BottomLeft_TopRight:
            return android.graphics.drawable.GradientDrawable.Orientation.BL_TR;
        case common.Orientation.Bottom_Top:
            return android.graphics.drawable.GradientDrawable.Orientation.BOTTOM_TOP;
        case common.Orientation.BottomRight_TopLeft:
            return android.graphics.drawable.GradientDrawable.Orientation.BR_TL;
        case common.Orientation.Right_Left:
            return android.graphics.drawable.GradientDrawable.Orientation.RIGHT_LEFT;
        case common.Orientation.TopRight_BottomLeft:
            return android.graphics.drawable.GradientDrawable.Orientation.TR_BL;
        case common.Orientation.Top_Bottom:
            return android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM;
    }
}