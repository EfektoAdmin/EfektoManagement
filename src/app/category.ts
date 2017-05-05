export class Category {
	id: string;
	name: string;
	image: string;
	parent: string;
	categorytype: string;
	description: string;
	hasproducts: number;
	tags: string;
	Order: string;
	Deleted: number;
	ParentCategoryName: string;
	constructor() { }

	public static getTagsObjectArray(_tags: string) {
		return JSON.parse(_tags);
	}
}
