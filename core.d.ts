
import { View, automationTextProperty } from "tns-core-modules/ui/core/view";
import { HorizontalAlignment, VerticalAlignment, Visibility, Length, PercentLength } from "tns-core-modules/ui/styling/style-properties";

export type Optional<T> = { [P in keyof T]?: T[P] }

declare module "tns-core-modules/ui/styling/style-properties/VerticalAlignment" {
    interface VerticalAlignment {
        props: string;
    }
}

declare module "tns-core-modules/ui/core/view" {
    interface View {
        props: Optional<this>, class: string, automationText: string;
    }
}

declare module "nativescript-ui-sidedrawer" {
    interface RadSideDrawer {
        props: Optional<this>, showOverNavigation: boolean, drawerSize: number, drawerPan, onDrawerOpening(args?: any);
    }
}

declare module "tns-core-modules/ui/page" {
    interface Page {
        props: Optional<this>, navigatingTo(args?: any), onLoaded(args?: any), onNavigatingTo(args?: any), onTap(args?: any);
    }
}

declare module "tns-core-modules/ui/button" {
    interface Button {
        props: Optional<this>, tap(args?:any);
    }
}

declare module "tns-core-modules/ui/layouts/wrap-layout" {
    interface WrapLayout {
        props: Optional<this>, itemWidth: Length;
    }
}

declare module "tns-core-modules/ui/layouts/grid-layout" {
    interface GridLayout {
        props: Optional<this>, rows, onTap(args?:any, event?: any), touch(args?:any);
    }
}

declare module "tns-core-modules/ui/action-bar" {
    interface ActionItem {
        props: Optional<this>, automationText, position;
    }
}