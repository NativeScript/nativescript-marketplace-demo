import { TouchGestureEventData } from "ui/gestures";
import { View } from "ui/core/view";
import { Color } from "color";

export function loadedGuard<CB extends Function>(args: View, cb: CB): CB {
    return <any> function() {
        if (args.android || args.ios) {
            return (<Function>cb).apply(this, arguments);
        }
        return undefined;
    }
}

export function grayTouch(args: TouchGestureEventData) {
    var viewObject: any = args.object;
    switch(args.action) {
        case "up":
            if (!(--viewObject.gesturePoints)) {
                viewObject.animate({
                    // Get gray fast!
                    backgroundColor: new Color(0xFFEEEEEE),
                    duration: 1 
                }).then(loadedGuard(viewObject, () => viewObject.animate({
                    backgroundColor: new Color(0xFFFFFFFF),
                    duration: 300
                })));
            }
            break;
        case "down":
            viewObject.gesturePoints = (viewObject.gesturePoints || 0) + 1;
            viewObject.backgroundColor = new Color(0xFFEEEEEE);
            break;
        case "cancel":
            viewObject.gesturePoints = 0;
            viewObject.animate({
                backgroundColor: new Color(0xFFFFFFFF),
                duration: 300
            });
            break;
    }
}