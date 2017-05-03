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
export class CategoryEditComponent implements OnInit{
	@Input() category = {};	
	@Input() public callBackFunction: Function;
	@Input() public removeCategoryFromListFunction: Function;

	mode = 'Observable';
	constructor(private categoryService: CategoryService){}

	saving=false;
	ngOnInit() { }

	deleteCategory(category: Category) {
		this.saving = true;
		this.categoryService.deleteCategory(category)
			.subscribe(
			responseCategory => {
				console.log("saved");
				this.saving = false;
				this.removeCategoryFromListFunction(category);
			});

	}
}


