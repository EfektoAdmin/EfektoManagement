import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Category } from './category';
import { CategoryService } from './services/category-service';

@Component({
	selector: 'categoryedit',
	templateUrl: 'app/templates/categoryedit.html',
	providers: [CategoryService]
})
export class CategoryEditComponent implements OnInit {
	@Input() category: Category;
	@Input() public callBackFunction: Function;
	@Input() public removeCategoryFromListFunction: Function;

	mode = 'Observable';
	constructor(private categoryService: CategoryService) { }

	saving = false;
	confirmFlag = false;
	ngOnInit() { }

	deleteCategory(category: Category) {

		this.confirmFlag = true;
	}

	confirm(yesOrNo: string) {
		if (yesOrNo == 'yes') {
			this.saving = true;
			this.categoryService.deleteCategory(this.category)
				.subscribe(
				responseCategory => {
					console.log("saved");
					this.saving = false;
					this.removeCategoryFromListFunction(this.category);
					this.confirmFlag = false;
				});
		}
		else if (yesOrNo == 'no') {
			this.confirmFlag = false;
		}

	}
}


