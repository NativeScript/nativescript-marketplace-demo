import { EventData, Observable } from "data/observable";
import { isAndroid } from "platform";
import { Page } from "ui/page";
import { View } from "ui/core/view";
import * as navigator from "../../../common/navigator";

var page: Page;
var cards = ["visa-card", "master-card", "amex-card"];
var textFields = ["card-number-txt", "exp-date-txt", "cvs-txt"];
var cardAccepted: boolean = false;

export function pageLoaded(args) {
    page = <Page>(<View>args.object).page;

    onStart();
}

function onStart() {
    setTimeout(() => {
        cards.forEach(id => page.getViewById(id).className = id + "-enter")
    });
}

export function onCardTap(args: EventData) {
    let tappedCard = <View>args.object;

    tappedCard.className = tappedCard.id + "-up";
    startEnterAnimation(page, tappedCard.id);
}

export function startEnterAnimation(page: Page, cardId: string) {
    let label = page.getViewById("label1");
    label.className = "label-collapsed";

    let checkoutLayout = page.getViewById("check-out-layout");
    checkoutLayout.className = cardId + "-check-out-layout-up";

    cards.forEach(id => {
        if (id !== cardId) {
            page.getViewById(id).className = "card-collapsed";
        }
    });

    let cardDetails = page.getViewById("card-details-grid");
    cardDetails.className = cardId + "-details-up";

    setTimeout(() => {
        page.getViewById(textFields[0]).className = "text-fields-fade-in"
    }, 25);
    setTimeout(() => {
        page.getViewById(textFields[1]).className = "text-fields-fade-in"
    }, 50);
    setTimeout(() => {
        page.getViewById(textFields[2]).className = "text-fields-fade-in"
    }, 75);
}

export function onTap(args: EventData) {
    if (!cardAccepted) {
        onCheckOut();
    } else {
        onDone();
    }
}

export function onCheckOut() {
    setCardAccepted(true);

    cards.forEach(id => { page.getViewById(id).className = "card-collapsed"; });

    let checkoutButton = page.getViewById("check-out-label");
    checkoutButton.className = "check-out-label-out";

    let checkoutLayout = page.getViewById("check-out-layout");
    checkoutLayout.className = "accept-card";

    let cardDetails = page.getViewById("card-details-grid");
    cardDetails.className = "card-details";

    setTimeout(() => {
        page.getViewById("button-done").className = "button-done-visible"
    });
}

export function onDone() {
    setCardAccepted(false);

    textFields.forEach(id => page.getViewById(id).className = "");
    cards.forEach(id => { page.getViewById(id).className = "card-collapsed"; });

    let cardDetails = page.getViewById("card-details-grid");
    cardDetails.className = "card-details";

    let checkoutLayout = page.getViewById("check-out-layout");
    checkoutLayout.className = "check-out-layout";

    let checkOutLabel = page.getViewById("check-out-label");
    checkOutLabel.className = "check-out-label";

    let label = page.getViewById("label1");
    label.className = "label1";

    onStart();
}

function setCardAccepted(isAccepted: boolean) {
    cardAccepted = isAccepted;
}

export function goBack(args) {
    navigator.navigateBackFromExample();
}