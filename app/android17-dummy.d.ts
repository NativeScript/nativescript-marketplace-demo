declare module android {
    export module app {
        export type Activity = any;
        export type Application = any;
        export type ActionBar = any;
    }

    export module net {
        export class Uri {
            public static parse(uriString: string): android.net.Uri;
        }
    }

    export module os {
        export type Bundle = any;
    }

    export module content {
        export class Intent {
            constructor(action: string, uri: android.net.Uri);
            static ACTION_VIEW: string;
            public static createChooser(target: android.content.Intent, title: string): android.content.Intent;
        }
        export type Context = any;
    }

    export module view {
        export type IMenuItem = any;
        export type ViewGroup = any;
        export type MotionEvent = any;

        export module animation {
            export class AccelerateInterpolator {
                constructor(factor: number);
            }
            export class DecelerateInterpolator {
                constructor(factor: number);
            }
            export class AccelerateDecelerateInterpolator {
                constructor();
            }
        }

        export module View {
            class OnClickListener {
                constructor(impl);
            }
        }

        export type View = any;
        export module inputmethod {
            export type InputMethodManager = any;
        }
    }

    export module widget {
        export type Button = any;
        export type Switch = any;
        export type EditText = any;
        export type ListView = any;
        export type ImageView = any;
        export type Toast = any;
        class TextView {
            constructor(context);
            setTextColor(value): void;
            setLayoutParams(params): void;
            setPadding(left, top, right, bottom): void;
            setOnClickListener(listener);
        }
        module FrameLayout {
            class LayoutParams {
                constructor(param1, param2);
                setMargins(left, top, right, bottom);
            }
        }
        class FrameLayout {
        }
    }

    export module graphics {
        export type Bitmap = any;

        export module drawable {
            export class ColorDrawable {
                constructor(color: number);
            }
            export class GradientDrawable {
                constructor();
            }
            export module GradientDrawable {
                export enum Orientation {
                    TOP_BOTTOM,
                    TR_BL,
                    RIGHT_LEFT,
                    BR_TL,
                    BOTTOM_TOP,
                    BL_TR,
                    LEFT_RIGHT,
                    TL_BR
                }
            }
        }
    }

    export module support {
        export module v4 {
            export module view {
                export var ViewCompat: any;
            }
        }
    }
}
