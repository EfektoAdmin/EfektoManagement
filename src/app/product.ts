export class Product {
	id: string;
	name: string;
	Description: string;
	Category: string;
	Image: string;
	tags: string;
	Features: string;
	ActNo: string;
	Warnings: string;
	Precautions: string;
	Order: string;
	constructor() { }

	public static getTagsObjectArray(_tags: string) {
		return JSON.parse(_tags);
	}
}
