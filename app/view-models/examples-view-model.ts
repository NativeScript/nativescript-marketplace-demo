export interface Example {
	title: string;
	isFeatured?: boolean;
	info?: string;
	image?: string;

}
export interface ExampleGroup extends Example {
	examples: Array<Example>;
}

export var exampleGroups: Array<ExampleGroup> = [
	{
		title: "example group 1",
		image: "~/images/empty.png",
		examples: [
			{ title: "example 1", image: "~/images/empty.png", isFeatured: true },
			{ title: "example 2.1", image: "~/images/empty.png" },
			{ title: "example 2.2", image: "~/images/empty.png" },
			{ title: "example 2.3", image: "~/images/empty.png" },
			{ title: "example 2.4", image: "~/images/empty.png" }
		]
	},

	{
		title: "example group 2",
		image: "~/images/empty.png",
		examples: [
			{ title: "example 3", image: "~/images/empty.png" },
			{ title: "example 4", image: "~/images/empty.png", isFeatured: true }
		]
	},
	
	{
		title: "example group 3",
		image: "~/images/empty.png",
		examples: [
			{ title: "example 5", image: "~/images/empty.png" },
			{ title: "example 6", image: "~/images/empty.png", isFeatured: true }
		]
	},
	
	{
		title: "example group 4",
		image: "~/images/empty.png",
		examples: [
			{ title: "example 7", image: "~/images/empty.png" },
			{ title: "example 8", image: "~/images/empty.png" },
			{ title: "example 9", image: "~/images/empty.png" },
			{ title: "example 10", image: "~/images/empty.png", isFeatured: true }
		]
	}
];

export var featuredExamples = new Array<Example>();
// TODO: Use lodash maybe
exampleGroups.forEach((group) => {
	group.examples.forEach((ex) =>{
		if(ex.isFeatured){ featuredExamples.push(ex); }
	})
})