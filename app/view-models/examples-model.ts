export interface Example {
	title: string;
	path?: string;
	isFeatured?: boolean;
	isNew?: boolean;
	info?: string;
	image?: string;
	controls: Array<string>;
}

export interface ExampleGroup {
	title: string;
	info?: string;
	isNew?: boolean;
	controls: Array<string>;
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
	
	{ title: "Chart Example 1", image: "~/images/empty.png", controls: ["chart"], isFeatured: true, isNew: true },
	{ title: "Chart Example 2", image: "~/images/empty.png", controls: ["chart"], isFeatured: true, isNew: true },

	{ title: "Side Drawer 1", image: "~/images/empty.png", controls: ["side-drawer"], isFeatured: true, isNew: true },
	{ title: "Side Drawer 2", image: "~/images/empty.png", controls: ["side-drawer"]},

	{ title: "List View 1", image: "~/images/empty.png", controls: ["list-view-ui"], isFeatured: true, isNew: true },
	{ title: "List View 2", image: "~/images/empty.png", controls: ["list-view-ui"] },
];

export var exampleGroups: Array<ExampleGroup> = [
	{ title: "CoreUI", isNew: true,
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
	
	{ title: "Chart", isNew: true, controls: ["chart"] },
	{ title: "Side Drawer", isNew: true, controls: ["side-drawer"] },
	{ title: "Calendar", isNew: false, controls: ["calendar"] },
	{ title: "List View", isNew: false, controls: ["list-view-ui"] },
];

export var featuredExamples = examples.filter((e) => e.isFeatured);

export function filterExamples(filterControls: Array<string>) {
	var result = examples.filter((example) => example.controls.some((ctrl) => (filterControls.indexOf(ctrl) >= 0)));
	return result;
}


// Validate that each example control is a group
var knownControls = new Array<string>();
exampleGroups.forEach((g) => knownControls.push.apply(knownControls, g.controls))

examples.forEach((ex) => ex.controls.forEach((c) => {
	if (knownControls.indexOf(c) < 0) {
		console.log(`Unknown control: '${ c }' in example '${ ex.title }'`);
	}
}));