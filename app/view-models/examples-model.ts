export interface Example {
	title: string;
	path?: string;
	isFeatured?: boolean;
	isNew?: boolean;
	info?: string;
	image?: string;
	controls: Array<string>;
}

export interface ControlInfo {
	title: string;
	info?: string;
	url?: string;
	group?: ExampleGroup;
}

export interface ExampleGroup {
	title: string;
	info?: string;
	url?: string;
	isNew?: boolean;
	controls: Array<string>;
	tint?: string;
}

export var examples: Array<Example> = [
	{
		title: "Layouts",
		image: "~/images/empty.png",
		controls: ["stack-layout", "grid-layout", "wrap-layout", "dock-layout", "absolute-layout"],
		path: "examples/layouts/layouts-example",
		info: "Few sentences of example information. Few sentences of example information.",
		isFeatured: true,
		isNew: true
	},
	
	{
		title: "User Profile",
		image: "~/images/empty.png",
		controls: ["scroll-view", "stack-layout", "label", "text-field", "text-view", "image", "button", "switch", "action-bar"],
		path: "examples/user-profile/user-profile-example",
		info: "Few sentences of example information. Few sentences of example information.",
		isFeatured: true,
		isNew: true
	},	
    
    {
		title: "Conference Agenda",
		image: "~/images/empty.png",
		controls: ["list-view", "segmented-bar", "search-bar", "action-bar", "label" ],
		path: "examples/conference-agenda/conference-agenda-example",
		info: "Few sentences of example information. Few sentences of example information.",
		isFeatured: true,
		isNew: true
	},     
	
	// { title: "Chart Example 1", image: "~/images/empty.png", controls: ["chart"], isFeatured: true, isNew: true },
	// { title: "Chart Example 2", image: "~/images/empty.png", controls: ["chart"], isFeatured: true, isNew: false },

	// { title: "Side Drawer 1", image: "~/images/empty.png", controls: ["side-drawer"], isFeatured: true, isNew: true },
	// { title: "Side Drawer 2", image: "~/images/empty.png", controls: ["side-drawer"]},

	// { title: "List View 1", image: "~/images/empty.png", controls: ["list-view-ui"], isFeatured: true, isNew: true },
	// { title: "List View 2", image: "~/images/empty.png", controls: ["list-view-ui"] },
];

export var groups: Array<ExampleGroup> = [
	{   
        title: "CoreUI", 
        isNew: true,
        info: "NativeScript ships with a set of user interface Views (also known as widgets) which you can use to build the user interface of a mobile application. Most of these views wrap the corresponding native view for each platform while providing a common API for working with it.",
        url:"http://docs.nativescript.org/ui-views",
		tint: "orange",
		controls: [
            "button",
        	"label",
        	"switch",
        	"stack-layout",
        	"grid-layout",
        	"wrap-layout",
        	"dock-layout",
        	"absolute-layout",
        	"scroll-view",
            "text-field", 
            "text-view", 
            "image",
            "action-bar",
            "segmented-bar",
            "search-bar",
            "list-view"] },
	
	{ title: "Chart", isNew: true, controls: ["chart"], tint: "green" },
	{ title: "Side Drawer", isNew: true, controls: ["side-drawer"], tint: "teal" }
	// { title: "Calendar", isNew: false, controls: ["calendar"], tint: "purple" },
	// { title: "List View", isNew: false, controls: ["list-view-ui"], tint: "magenta" },
];

export var controlInfos = new Map<string, ControlInfo>();
controlInfos.set( "button",         { title: "Button", url: "http://docs.nativescript.org/ApiReference/ui/button/how-to.html", info: "info..."});
controlInfos.set( "label",          { title: "Label", url: "http://docs.nativescript.org/ApiReference/ui/label/how-to.html", info: "info..."});
controlInfos.set( "switch",         { title: "Switch", url: "http://docs.nativescript.org/ApiReference/ui/switch/how-to.html", info: "info..."});
controlInfos.set( "stack-layout",   { title: "StackLayout", url: "http://docs.nativescript.org/ApiReference/ui/layouts/stack-layout/how-to.html", info: "info..."});
controlInfos.set( "grid-layout",    { title: "GridLayout", url: "http://docs.nativescript.org/ApiReference/ui/layouts/grid-layout/how-to.html", info: "info..."});
controlInfos.set( "wrap-layout",    { title: "WrapLayout", url: "http://docs.nativescript.org/ApiReference/ui/layouts/wrap-layout/how-to.html", info: "info..."});
controlInfos.set( "dock-layout",    { title: "DockLayout", url: "http://docs.nativescript.org/ApiReference/ui/layouts/dock-layout/how-to.html", info: "info..."});
controlInfos.set( "absolute-layout",{ title: "AbsoluteLayout", url: "http://docs.nativescript.org/ApiReference/ui/layouts/absolute-layout/how-to.html", info: "info..."});
controlInfos.set( "scroll-view",    { title: "ScrollView", url: "http://docs.nativescript.org/ApiReference/ui/scroll-view/how-to.html", info: "info..."});
controlInfos.set( "text-field",     { title: "TextField",  url: "http://docs.nativescript.org/ApiReference/ui/text-field/how-to.html", info: "info..."});
controlInfos.set( "text-view",      { title: "TextView",  url: "http://docs.nativescript.org/ApiReference/ui/text-view/how-to.html", info: "info..."});
controlInfos.set( "image",          { title: "Image", url: "http://docs.nativescript.org/ApiReference/ui/image/how-to.html", info: "info..."});
controlInfos.set( "action-bar",     { title: "ActionBar", url: "http://docs.nativescript.org/ApiReference/ui/action-bar/how-to.html", info: "info..."});
controlInfos.set( "segmented-bar",  { title: "SegmentedBar", url: "http://docs.nativescript.org/ApiReference/ui/segmented-bar/how-to.html", info: "info..."});
controlInfos.set( "search-bar",     { title: "SearchBar", url: "http://docs.nativescript.org/ApiReference/ui/search-bar/how-to.html", info: "info..."});
controlInfos.set( "list-view",      { title: "ListView", url: "http://docs.nativescript.org/ApiReference/ui/list-view/how-to.html", info: "info..."});

controlInfos.set( "chart",      { title: "Chart", url: "http://docs.telerik.com/devtools/nativescript-ui/Controls/Chart/chart-overview", info: "info..."});
controlInfos.set( "side-drawer",      { title: "Side Drawer", url: "http://docs.telerik.com/devtools/nativescript-ui/Controls/SideDrawer/sidedrawer-overview", info: "info..."});
controlInfos.set( "calendar",      { title: "Calendar", url: "http://docs.telerik.com/devtools/nativescript-ui/introduction", info: "info..."});
controlInfos.set( "list-view-ui",      { title: "List View", url: "http://docs.telerik.com/devtools/nativescript-ui/introduction", info: "info..."});

export var featuredExamples = examples.filter((e) => e.isFeatured);

export function filterExamples(filterControls: Array<string>) {
	var result = examples.filter((example) => example.controls.some((ctrl) => (filterControls.indexOf(ctrl) >= 0)));
	return result;
}

// Validate that each example control is a group
// Add groups for examples
var knownControls = new Array<string>();
groups.forEach(group => {
	knownControls.push.apply(knownControls, group.controls)
	group.controls.forEach(control => {
		var info = controlInfos.get(control);
		if (info) {
			if (info.group) {
				console.log(`Control ${info.title} allready in groups ${info.group.title} while adding to ${group.title}.`);
			}
			info.group = group;
		} else {
			console.log(`No info for control: '${control}'`);	
		}
	});
});

examples.forEach((ex) => ex.controls.forEach((c) => {
	if (knownControls.indexOf(c) < 0) {
		console.log(`Unknown control: '${ c }' in example '${ ex.title }'`);
	}
}));
