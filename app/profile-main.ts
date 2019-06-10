import * as pages from "tns-core-modules/ui/page";
import * as frame from "tns-core-modules/ui/frame";
import * as button from "tns-core-modules/ui/button";
import * as prof from "./common/profiling";
export function createPage() {
    var page = new pages.Page();
    var btn = new button.Button();
    btn.text = "GO!";
    btn.on(button.Button.tapEvent, function() {
        prof.startCPUProfile("main-page");
        var nextPage = "views/main-page/main-page";
        frame.topmost().navigate(nextPage);
        
        // testListenersCreate();
    });

    page.content = btn;
    return page;
}

// var arr = [];
// function testListenersCreate() {
//     console.log("--------- testListenersCreate START ------------");
//     for (let i = 0; i < 3; i++) {
//         prof.start("View.OnClickListener");
//         arr.push(new (<any>android).view.View.OnClickListener({
//             onClick: function(v) {
//                 // do nothing
//             }
//         }));
//         prof.pause("View.OnClickListener");
//     }

//     for (let i = 0; i < 3; i++) {
//         prof.start("Toolbar.OnMenuItemClickListener");
//         arr.push(new (<any>android).appcompat.widget.Toolbar.OnMenuItemClickListener({
//             onMenuItemClick: function(item: android.view.IMenuItem): boolean {
//                 // do nothing
//                 return false;
//             }
//         }));
//         prof.pause("Toolbar.OnMenuItemClickListener");
//     }


//     for (let i = 0; i < 3; i++) {
//         prof.start("TabHost.OnTabChangeListener");
//         arr.push(new (<any>android).widget.TabHost.OnTabChangeListener({
//             onTabChanged: function(id: string) {
//                 // do nothing
//             }
//         }));

//         prof.pause("TabHost.OnTabChangeListener");
//     }


//     console.log("--------- testListenersCreate END ------------");
// }