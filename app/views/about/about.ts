import { Page } from "ui/page";
import { EventData } from "data/observable";
import * as navigator from "../../common/navigator";

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