import * as firebase from "../common/firebase";
import * as utils from "utils/utils";
import { isIOS } from "platform";

export function navigatingTo(args) {
    args.object.bindingContext = firebase.viewModel;
}

export function itemTap(args) {
    const article: firebase.Article = firebase.viewModel.news[args.index];
    article.isRead = true;
    if (article.url) {
        utils.openUrl(article.url);
    }
}

declare var UITableViewCellSelectionStyle;

export function listViewItemLoading(args) {
    if (isIOS) {
        var cell = args.ios;
        cell.selectionStyle = UITableViewCellSelectionStyle.UITableViewCellSelectionStyleNone;
    }
}