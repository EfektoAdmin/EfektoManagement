import { OnInit, HostListener } from '@angular/core';
import { Component } from '@angular/core';
import { Category } from './category';
import { CategoryEditComponent } from './app.categoryedit';
import { CategoryModalComponent } from './app.categorymodal';
import { CategoryService } from './services/category-service';

@Component({
	selector: 'category-list',
	templateUrl: 'app/templates/categories.html',
	providers: [CategoryService],
	directives: [CategoryEditComponent, CategoryModalComponent]
})
export class CategoriesComponent implements OnInit {
	categories: Category[];
	mode = 'Observable';

	confirmFlag = false;
	confirmProcess: string = "";

	saving = false;
	showModal = false;
	addCategory = false;
	category = {};

	constructor(private categoryService: CategoryService) { }

	ngOnInit() { this.getCategories(); }

	getCategories() {
		this.categoryService.getCategories()
			.subscribe(
			categories => {
				this.categories = categories

				this.categories.forEach(element => {
					if (element.parent != null && element.parent.trim() != '') {
						let tempCategories = this.categories.filter(a => a.id == element.parent);
						if (tempCategories != null && tempCategories.length > 0) {
							element.ParentCategoryName = tempCategories[0].name;
						}
					}
				})
			});
	}

	showCategoryModal(addOrEdit) {
		this.showModal = true;

		if (addOrEdit == 'add') {
			this.category = new Category();
			this.addCategory = true;
		}
		else if (addOrEdit == 'edit') {
			this.addCategory = false;
		}

	}

	closeModal = () => {
		this.showModal = false;
		this.getCategories();
	}

	updateCategoryList = (category: Category) => {
		this.categories.push(category);
	}

	updateCategory = (category: Category) => {
		this.category = category;
		this.showCategoryModal('edit');
	}

	removeCategoryFromList = (category: Category) => {
		this.categories = this.categories.filter(item => item.id !== category.id);

	}
}
