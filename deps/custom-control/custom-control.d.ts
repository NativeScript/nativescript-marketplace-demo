declare module "custom-control" {
    import { View } from "ui/core/view";

    export class CustomControl extends View {
        public applyTemplate(): View;
    }
}