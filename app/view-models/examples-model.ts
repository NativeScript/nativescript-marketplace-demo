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
	// { title: "CoreUI 1", image: "~/images/empty.png", path:"~/examples/test-example/test-example", controls: ["button", "label", "switch"], 
	// 	isFeatured: true, info: "Few sentences of example information. Few sentences of example information.", isNew: true },
	{
		title: "Layouts",
		image: "~/images/empty.png",
		controls: ["stack-layout", "grid-layout", "wrap-layout", "dock-layout", "absolute-layout"],
		path: "~/examples/layouts/layouts-example",
		info: "Few sentences of example information. Few sentences of example information.",
		isFeatured: true,
		isNew: true
	},

	{ title: "CoreUI 3", image: "~/images/empty.png", controls: ["button", "label", "switch"] },
	{ title: "CoreUI 4", image: "~/images/empty.png", controls: ["button"] },
	{ title: "CoreUI 5", image: "~/images/empty.png", controls: ["button"] },

	{ title: "Chart 1", image: "~/images/empty.png", controls: ["chart", "control 1", "control 2", "control 3", "control 4", "control 5", "control 6"], isFeatured: true },
	{ title: "Chart 2", image: "~/images/empty.png", controls: ["chart"], isFeatured: true, isNew: true },

	{ title: "Side Drawer 1", image: "~/images/empty.png", controls: ["side-drawer"] },
	{ title: "Side Drawer 2", image: "~/images/empty.png", controls: ["button"], isFeatured: true },

	{ title: "List View 1", image: "~/images/empty.png", controls: ["list-view"] },
	{ title: "List View 2", image: "~/images/empty.png", controls: ["list-view"] },
	{ title: "List View 3", image: "~/images/empty.png", controls: ["list-view"] },
	{ title: "List View 4", image: "~/images/empty.png", controls: ["list-view"], isFeatured: true }
];

export var exampleGroups: Array<ExampleGroup> = [
	{ title: "CoreUI", isNew: true, controls: ["stack-layout", "grid-layout", "wrap-layout", "dock-layout", "absolute-layout","button", "label", "switch"] },
	{ title: "Chart", isNew: true, controls: ["chart"] },
	{ title: "Side Drawer", isNew: true, controls: ["side-drawer"] },
	{ title: "Calendar", isNew: false, controls: ["calendar"] },
	{ title: "List View", isNew: false, controls: ["list-view"] },
];

export var featuredExamples = examples.filter((e) => e.isFeatured);

export function filterExamples(filterControls: Array<string>) {
	var result = examples.filter((example) => example.controls.some((ctrl) => (filterControls.indexOf(ctrl) >= 0)));
	return result;
}
