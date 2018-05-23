import { ReservationsViewModel, Reservation } from "./reservations-view-model";
import { EventData } from "data/observable";
import { Page, NavigatedData } from "ui/page";
import * as viewModule from "ui/core/view";
import { topmost as topmostFrame } from "ui/frame";
import * as navigator from "../../common/navigator";
import * as dataFormModule from "nativescript-ui-dataform";
import { Color } from "color";
import * as platform from "platform";

var colorAccent: Color = new Color("#BF3136");
var model: ReservationsViewModel;
var imageWidth: number = 13;

// Examples navigation
export function pageNavigatedTo(args: NavigatedData) {
    var page = <Page>args.object;
    model = <ReservationsViewModel>args.context;
    page.bindingContext = model;
}

export function saveChanges(args: EventData) {
    var page = <Page>(<viewModule.View>args.object).page;
    var dataForm = <dataFormModule.RadDataForm>viewModule.getViewById(page, "reservationForm");
    dataForm.commitAll();

    if (dataForm.hasValidationErrors()) {
        return;
    }
    
    if (model.isNew) {
        model.reservations.push(model.currentReservation);
    }
    
    navigator.navigateBackWithContext(model);
}

export function goBack(args: EventData) {
    navigator.navigateBack();
}

// Editor customizations
export function dfEditorSetup(data: dataFormModule.DataFormEventData) {
    switch (data.propertyName) {
        case "name": setupEditorName(data.editor); break;
        case "phone": setupEditorPhone(data.editor); break;
        case "date": setupEditorDate(data.editor); break;
        case "time": setupEditorTime(data.editor); break;
        case "table": setupEditorTable(data.editor); break;
        case "section": setupEditorSection(data.editor); break;
        case "guests": setupEditorGuests(data.editor); break;
        case "origin": setupEditorOrigin(data.editor); break;
        case "cancelled": setupEditorCancelled(data.editor); break;
    }
}

export function setupEditorName(editor) {
    hideLabel(editor);

    applyEditorOffset(editor, imageWidth);
    applySeparatorOffset(editor, 36);

    formatFeedbackLabel(editor);
}

export function setupEditorPhone(editor) {
    hideLabel(editor);

    applyEditorOffset(editor, imageWidth);
    applySeparatorOffset(editor, 36);

    formatFeedbackLabel(editor);
}

export function setupEditorDate(editor) {
    hideLabel(editor);

    applyAccessoryArrowColor(editor, colorAccent);
    applyEditorOffset(editor, imageWidth);
    applySeparatorOffset(editor, 36);
}

export function setupEditorTime(editor) {
    hideLabel(editor);

    applyAccessoryArrowColor(editor, colorAccent);
    applyEditorOffset(editor, imageWidth);
    applySeparatorOffset(editor, 36);
}

export function setupEditorTable(editor) {
    hideSeparator(editor);
    hideBackground(editor);

    var pickerDelegate = UIPickerViewDelegateImplementation.new().initWithOwner(editor);
    editor.pickerView.delegate = pickerDelegate;

    applyAccessoryArrowColor(editor, colorAccent);
    applyEditorOffset(editor, 0);
    applyLabelOffset(editor, 12);
}

export function setupEditorSection(editor) {
    hideBackground(editor);

    var pickerDelegate = UIPickerViewDelegateImplementation.new().initWithOwner(editor);
    editor.pickerView.delegate = pickerDelegate;

    applyAccessoryArrowColor(editor, colorAccent);
    applyEditorOffset(editor, 6);
    applyLabelOffset(editor, imageWidth + 12);
    applySeparatorOffset(editor, 36);
    applyTintColor(editor, colorAccent);
}

export function setupEditorGuests(editor) {
    
    applyAccessoryArrowColor(editor, colorAccent);
    applyLabelOffset(editor, 12);
    applySeparatorOffset(editor, 36);
    applyTintColor(editor, colorAccent);
    applyValueOffset(editor, -64);
}

export function setupEditorOrigin(editor) {
    hideLabel(editor);
    hideSeparator(editor);

    applyAccessoryArrowColor(editor, colorAccent);
    applyTintColor(editor, colorAccent);
}

export function setupEditorCancelled(editor) {
    hideLabel(editor);
    hideSeparator(editor);
    applySeparatorOffset(editor, 36);
}

export function applySeparatorOffset(editor, value) {
    editor.style.separatorLeadingSpace = value;
}

export function applyLabelOffset(editor, value) {
    editor.style.textLabelOffset = { horizontal: value, vertical: 0 };
}

export function applyEditorOffset(editor, value) {
    editor.style.editorOffset = { horizontal: value, vertical: 0 };
}

export function applyValueOffset(editor, value) {
    var labelDef = editor.gridLayout.definitionForView(editor.valueLabel);
    labelDef.contentOffset = { horizontal: value, vertical: 0 };
}

export function applyTintColor(editor, value) {
    editor.editor.tintColor = value.ios;
}

export function applyAccessoryArrowColor(editor, value) {
    editor.style.accessoryArrowStroke = TKStroke.strokeWithColor(value.ios);
}

export function hideLabel(editor) {
    var titleDef = editor.gridLayout.definitionForView(editor.textLabel);
    editor.gridLayout.setWidthForColumn(0, titleDef.column);
}

export function hideSeparator(editor) {
    editor.style.separatorColor = null;
}

export function hideBackground(editor) {
    editor.backgroundColor = UIColor.clearColor;
}

export function formatFeedbackLabel(editor) {
    editor.style.feedbackLabelOffset = { horizontal: imageWidth, vertical: 0 };
    editor.feedbackLabel.font = UIFont.fontWithNameSize("Verdana-Italic", 10);
}

export function dfGroupUpdate(data: dataFormModule.DataFormEventData) {
    if (data.groupName != "TABLE DETAILS") {
        return;
    }

    var backgroundImage = UIImage.imageNamed("dataform_table_bg");
    var backgroundColor = UIColor.colorWithPatternImage(backgroundImage);
    data.group.backgroundColor = backgroundColor;
    data.group.editorsContainer.backgroundColor = UIColor.clearColor;
}

// Custom Button editor
var buttonEditorHelper;
export function editorNeedsView(args) {
    buttonEditorHelper = new ButtonEditorHelper();
    buttonEditorHelper.editor = args.object;
    var editorView = UIButton.buttonWithType(UIButtonType.System);
    editorView.tintColor = colorAccent.ios;
    editorView.contentHorizontalAlignment = UIControlContentHorizontalAlignment.Left;
    editorView.addTargetActionForControlEvents(buttonEditorHelper, "handleTap:", UIControlEvents.TouchUpInside);
    args.view = editorView;
}

export function editorHasToApplyValue(args) {
    buttonEditorHelper.updateEditorValue(args.view, args.value);
}

export function editorNeedsValue(args) {
    args.value = buttonEditorHelper.buttonValue;
}

export class ButtonEditorHelper extends NSObject 
{    
    public buttonValue: Boolean;
    public editor: dataFormModule.CustomPropertyEditor;

    public updateEditorValue(editorView, newValue) {
        this.buttonValue = newValue;
        var buttonText = this.buttonValue ? "CANCELLED" : "CANCEL RESERVATION";
        editorView.setTitleForState(buttonText, UIControlState.Normal);
    }

    public "handleTap:"(sender) {
        var newValue = !this.buttonValue;
        this.updateEditorValue(sender, newValue);
        this.editor.notifyValueChanged();
    }

    public static ObjCExposedMethods = {
        "handleTap:": { returns: interop.types.void, params: [ UIView.class() ] }
    };
}

// Custom Picker view delegate
class UIPickerViewDelegateImplementation extends NSObject implements UIPickerViewDelegate {
    public static ObjCProtocols = [UIPickerViewDelegate];

    static new(): UIPickerViewDelegateImplementation {
        return <UIPickerViewDelegateImplementation>super.new();
    }

    private _owner: TKDataFormPickerViewEditor;

    public initWithOwner(owner: TKDataFormPickerViewEditor): UIPickerViewDelegateImplementation {
        this._owner = owner;
        return this;
    }

    public pickerViewTitleForRowForComponent(pickerView: UIPickerView, row: NSInteger, component: NSInteger): NSString {
        return this._owner.options[row];
    }

    public pickerViewDidSelectRowInComponent(pickerView: UIPickerView, row: NSInteger, component: NSInteger): void {
        this._owner.selectedIndex = row;
        this._owner.owner.editorValueChanged(this._owner);
    }

    public pickerViewAttributedTitleForRowForComponent(pickerView: UIPickerView, row: NSInteger, component: NSInteger): NSAttributedString {
        var title = this.pickerViewTitleForRowForComponent(pickerView, row, component);
        var titleString = String(title);
        var keys = NSMutableArray.alloc().init();
        keys.addObject(NSForegroundColorAttributeName);
        var values = NSMutableArray.alloc().init();
        values.addObject(UIColor.whiteColor);
        var attr = NSDictionary.alloc().initWithObjectsForKeys(values, keys);
        var res = NSAttributedString.alloc().initWithStringAttributes(titleString, attr);
        return res;
    }
}