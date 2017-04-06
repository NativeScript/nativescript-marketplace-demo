import { View } from "ui/core/view";
import { Color } from "color";
import * as platform from "platform";
import * as common from "./linear-gradient-common";

global.moduleMerge(common, exports);

export function drawBackground(view: View, colors: Array<Color>, orientation?: common.Orientation) {
    let nativeView = (<any>view).nativeView; 
    if (!nativeView)
    {
        throw new Error("Native view is not created yet!");
    }
    let gradientLayer = CAGradientLayer.layer();
    let nativeColors = NSMutableArray.alloc().initWithCapacity(colors.length);
    
    colors.forEach(function(color: Color) {
       nativeColors.addObject(color.ios.CGColor);
    });
    gradientLayer.colors = nativeColors;
    
    gradientLayer.frame = nativeView.bounds;
    setStartAndEndPoints(gradientLayer, orientation);
    nativeView.layer.insertSublayerAtIndex(gradientLayer, 0);
}

function setStartAndEndPoints(gradientLayer: CAGradientLayer, orientation?: common.Orientation){
     switch (orientation) {
        case common.Orientation.TopLeft_BottomRight:
            gradientLayer.startPoint =  CGPointMake(0, 0);
            gradientLayer.endPoint   =  CGPointMake(1, 1);
        case common.Orientation.Left_Right:
            gradientLayer.startPoint =  CGPointMake(0, 0.5);
            gradientLayer.endPoint   =  CGPointMake(1, 0.5);
        case common.Orientation.BottomLeft_TopRight:
            gradientLayer.startPoint =  CGPointMake(0, 1);
            gradientLayer.endPoint   =  CGPointMake(1, 0);
        case common.Orientation.Bottom_Top:
            gradientLayer.startPoint =  CGPointMake(0.5, 1);
            gradientLayer.endPoint   =  CGPointMake(0.5, 0);
        case common.Orientation.BottomRight_TopLeft:
            gradientLayer.startPoint =  CGPointMake(1, 1);
            gradientLayer.endPoint   =  CGPointMake(0, 0);
        case common.Orientation.Right_Left:
            gradientLayer.startPoint =  CGPointMake(1, 0.5);
            gradientLayer.endPoint   =  CGPointMake(0, 0.5);
        case common.Orientation.TopRight_BottomLeft:
            gradientLayer.startPoint =  CGPointMake(1, 0);
            gradientLayer.endPoint   =  CGPointMake(0, 1);
        case common.Orientation.Top_Bottom:
            gradientLayer.startPoint =  CGPointMake(0.5, 0);
            gradientLayer.endPoint   =  CGPointMake(0.5, 1);
    }
}