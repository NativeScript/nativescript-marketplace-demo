import * as applicationModule from "application";

export interface Example {
    title: string;
    path?: string;
    isFeatured?: boolean;
    isNew?: boolean;
    info?: string;
    image?: string;
    controls: string;

    group?: ExampleGroup;
}

export interface ExampleGroup {
    id: string;
    title: string;
    info?: string;
    url?: string;
    isNew?: boolean;
    tint?: string;

    examples: Array<Example>;
}

export var groups: Array<ExampleGroup> = [
    {
        id: "coreui",
        title: "CoreUI",
        isNew: false,
        info: "NativeScript enables developers to build cross platform native apps while sharing the application code across the platforms. It ships with a set of user interface Views (also known as widgets) which you can use to build the user interface of a mobile application. Most of these views wrap the corresponding native platform views while providing a common API to work with.",
        url: "http://docs.nativescript.org/ui-views",
        tint: "#034d8d",
        examples: [
            {
                title: "Layouts",
                image: "res://screen_layouts",
                controls: "stack-layout grid-layout wrap-layout dock-layout absolute-layout",
                path: "examples/layouts/layouts-example",
                info: "NativeScript provides a recursive layout system which sizes and positions views on the screen. The supported layouts are stack, grid, wrap, dock and absolute.",
                isFeatured: true,
                isNew: false
            },

            {
                title: "User profile",
                image: "res://screen_user_profile",
                controls: "scroll-view stack-layout label text-field text-view image button switch action-bar",
                path: "examples/user-profile/user-profile-example",
                info: "This example demonstrates how you can use the different NativeScript layouts together to achieve a data input form behavior.",
                isFeatured: true,
                isNew: false
            },

            {
                title: "Conference agenda",
                image: "res://screen_conference_agenda",
                controls: "list-view segmented-bar search-bar action-bar label",
                path: "examples/conference-agenda/conference-agenda-example",
                info: "This example demonstrates how you can create a ListView item template using the GridLayout.",
                isFeatured: true,
                isNew: false
            }]

    },
    {
        id: "chart",
        title: "Chart",
        isNew: false,
        url: "http://docs.telerik.com/devtools/nativescript-ui/Controls/Chart/chart-overview",
        info: "Chart for NativeScript supports chart type series essential for visualizing your application data. You can customize its look and feel to match those of your application.",
        tint: "#018f88",
        examples: [
            {
                title: "Bar series",
                image: "res://screen_bar_chart",
                path: "examples/chart/bar-series",
                info: "Bar charts are one of the most common types of graph used to display data. They are mostly used to show amounts or the number of times a value occurs.",
                controls: "chart",
                isFeatured: true,
                isNew: false
            },
            {
                title: "Line series",
                image: "res://screen_line_chart",
                path: "examples/chart/line-series",
                info: "Line charts are often used to plot changes in data over time, such as monthly temperature changes or daily changes in stock market prices.",
                controls: "chart",
                isFeatured: true,
                isNew: false
            },
            {
                title: "Area series",
                image: "res://screen_area_chart",
                path: "examples/chart/area-series",
                info: "Area charts are much like line charts, but they display different colors in the areas below the lines. This colorful and visual display distinguishes the data more clearly.",
                controls: "chart",
                isFeatured: true,
                isNew: false
            },
            {
                title: "Pie series",
                image: "res://screen_pie_chart",
                path: "examples/chart/pie-series",
                info: "Pie charts are used to display the contribution of frantional parts to a whole. Each data point is a pie slice with arc size proportional to the magnitude of the point's value.",
                controls: "chart",
                isFeatured: true,
                isNew: false
            }
        ]
    },
    {
        id: "listview",
        title: "ListView",
        isNew: true,
        url: "http://docs.telerik.com/devtools/nativescript-ui/Controls/ListView/listview-overview",
        info: "ListView for NativeScript is a powerful UI virtualized list control that provides popular UX scenarios out-of-the-box.",
        tint: "#ff6e40",
        examples: [
             {
                title: "Item layouts",
                image: "res://screen_listview_layouts",
                path: "examples/listview/layouts/listview-layouts",
                info: "ListView for NativeScript supports different item layouts that are UI virtualized and optimized for mobile.",
                controls: "listview",
                isFeatured: true,
                isNew: false
            },
            {
                title: "Item reorder",
                image: "res://screen_reorder",
                path: "examples/listview/reorder/listview-reorder",
                info: "Item reorder allows you to change the position of an item in ListView by dragging it.",
                controls: "listview",
                isFeatured: true,
                isNew: false
            },
            {
                title: "Selection",
                image: "res://screen_listview_selection",
                path: "examples/listview/selection/main-page",
                info: "ListView supports two selection modes: single and miltiple. It also exposes convenient API for managing selection. You can programmatically select, deselect and query the currently selected items.",
                controls: "listview",
                isFeatured: true,
                isNew: false
            }
        ]
    },
    {
        id: "dataform",
        title: "DataForm",
        isNew: true,
        url: "http://docs.telerik.com/devtools/nativescript-ui/Controls/DataForm/dataform-overview",
        info: "DataForm for NativeScript helps you edit the properties of a business object during runtime and build a mobile form fast and easy. ",
        tint: "#ff6e40",
        examples: [
             {
                title: "Reservations",
                image: "res://screen_dataform",
                path: "examples/dataform/reservations-list-page",
                info: "DataForm for NativeScript can be used in various scenarios where a business object has to be edited. This example demonstrates how to edit the information about reservations in a restaurant.",
                controls: "dataform",
                isFeatured: true,
                isNew: true
            }
        ]
    }
    // { title: "Side Drawer", isNew: true, controls: ["side-drawer"], tint: "teal", url: "http://docs.telerik.com/devtools/nativescript-ui/Controls/SideDrawer/sidedrawer-overview", info: "info..." }
    // { title: "Calendar", isNew: false, controls: ["calendar"], tint: "purple", url: "http://docs.telerik.com/devtools/nativescript-ui/Controls/SideDrawer/sidedrawer-overview", info: "info..." },
    // { title: "List View", isNew: false, controls: ["list-view-ui"], tint: "magenta", url: "http://docs.telerik.com/devtools/nativescript-ui/Controls/SideDrawer/sidedrawer-overview", info: "info..." },
];


// Assign groups to examples and filter featured examples
export var featuredExamples = new Array<Example>();
groups.forEach(group => {
    group.examples.forEach(ex => {
        if (ex.isFeatured) {
            featuredExamples.push(ex);
        }

        ex.group = group;
    })
});