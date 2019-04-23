import { Page } from "tns-core-modules/ui/page";
import { EventData } from "tns-core-modules/data/observable";
import * as navigator from "../../common/navigator";
import * as application from "tns-core-modules/application";

var page;

export function onPageLoaded(args: EventData) {
    page = <Page>args.object;
}

export function goBack() {
    navigator.navigateBack();
}

export function showSlideout(args) {
    page.getViewById("side-drawer").toggleDrawerState();
}