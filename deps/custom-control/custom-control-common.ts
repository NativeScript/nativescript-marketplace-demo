import builderModule = require("ui/builder");
import { View } from "ui/core/view";

import definitionModule = require("custom-control");

export class CustomControl extends View implements definitionModule.CustomControl {
    private _template: View;

    public get _childrenCount(): number {
        if (this._template) {
            return 1;
        }

        return 0;
    }

    protected get template() {
        return this._template;
    }

    protected get path() {
        return null;
    }

    protected get templateName() {
        return null;
    }

    public _eachChildView(callback: (child: View) => boolean) {
        if (this._template) {
            callback(this._template);
        }
    }

    public applyTemplate(): View {
        this._template = builderModule.load({
            path: this.path, 
            name: this.templateName, 
            exports: this
        });

        this._template.bindingContext = this;

        this.onApplyTemplate(this._template);

        return this._template;
    }

    protected onApplyTemplate(template: View) {
    }
}