import { View } from "tns-core-modules/ui/core/view";
import { Color } from "tns-core-modules/color";
import * as platform from "tns-core-modules/platform";
import { Orientation } from "./linear-gradient-common";

export * from "./linear-gradient-common";

export function drawBackground(view: View, colors: Array<Color>, orientation?: Orientation) {
    let nativeView = (<any>view).nativeView; 
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

function getAndroidOrientation(orientation?: Orientation){
    switch (orientation) {
        case Orientation.TopLeft_BottomRight:
            return android.graphics.drawable.GradientDrawable.Orientation.TL_BR;
        case Orientation.Left_Right:
            return android.graphics.drawable.GradientDrawable.Orientation.LEFT_RIGHT;
        case Orientation.BottomLeft_TopRight:
            return android.graphics.drawable.GradientDrawable.Orientation.BL_TR;
        case Orientation.Bottom_Top:
            return android.graphics.drawable.GradientDrawable.Orientation.BOTTOM_TOP;
        case Orientation.BottomRight_TopLeft:
            return android.graphics.drawable.GradientDrawable.Orientation.BR_TL;
        case Orientation.Right_Left:
            return android.graphics.drawable.GradientDrawable.Orientation.RIGHT_LEFT;
        case Orientation.TopRight_BottomLeft:
            return android.graphics.drawable.GradientDrawable.Orientation.TR_BL;
        case Orientation.Top_Bottom:
            return android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM;
    }
}