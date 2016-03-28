import { View } from "ui/core/view";
import { Color } from "color";

export enum Orientation {
    TopLeft_BottomRight,
    Left_Right,
    BottomLeft_TopRight,
    Bottom_Top,
    BottomRight_TopLeft,
    Right_Left,
    TopRight_BottomLeft,
    Top_Bottom    
}

export function drawBackground(view: View, colors: Array<Color>, orientation?: Orientation);