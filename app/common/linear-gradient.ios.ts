import { View } from "ui/core/view";
import { Color } from "color";
import * as platform from "platform";
import { Orientation } from "./linear-gradient-common";

export * from "./linear-gradient-common";

export function drawBackground(view: View, colors: Array<Color>, orientation?: Orientation) {
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

function setStartAndEndPoints(gradientLayer: CAGradientLayer, orientation?: Orientation){
     switch (orientation) {
        case Orientation.TopLeft_BottomRight:
            gradientLayer.startPoint =  CGPointMake(0, 0);
            gradientLayer.endPoint   =  CGPointMake(1, 1);
        case Orientation.Left_Right:
            gradientLayer.startPoint =  CGPointMake(0, 0.5);
            gradientLayer.endPoint   =  CGPointMake(1, 0.5);
        case Orientation.BottomLeft_TopRight:
            gradientLayer.startPoint =  CGPointMake(0, 1);
            gradientLayer.endPoint   =  CGPointMake(1, 0);
        case Orientation.Bottom_Top:
            gradientLayer.startPoint =  CGPointMake(0.5, 1);
            gradientLayer.endPoint   =  CGPointMake(0.5, 0);
        case Orientation.BottomRight_TopLeft:
            gradientLayer.startPoint =  CGPointMake(1, 1);
            gradientLayer.endPoint   =  CGPointMake(0, 0);
        case Orientation.Right_Left:
            gradientLayer.startPoint =  CGPointMake(1, 0.5);
            gradientLayer.endPoint   =  CGPointMake(0, 0.5);
        case Orientation.TopRight_BottomLeft:
            gradientLayer.startPoint =  CGPointMake(1, 0);
            gradientLayer.endPoint   =  CGPointMake(0, 1);
        case Orientation.Top_Bottom:
            gradientLayer.startPoint =  CGPointMake(0.5, 0);
            gradientLayer.endPoint   =  CGPointMake(0.5, 1);
    }
}