import { Component } from '@angular/core';
import { ProductsComponent } from './app.productlist';
import { CategoriesComponent } from './app.categorylist';
import { LoginComponent } from './app.login';

@Component({
	selector: 'efekto-management-app',
	templateUrl: 'app/templates/main.html',
	directives: [CategoriesComponent, ProductsComponent, LoginComponent]
})
export class AppComponent {
	showLogin = true;
	showCategories = true;
	showProducts = false;

	constructor() { }

	showComponent(componentName) {
		if (componentName == "categories") {
			this.showCategories = true;
			this.showProducts = false;
		} else {
			this.showCategories = false;
			this.showProducts = true;
		}
	}

	logout() {
		this.showLogin = true;
	}

	loginSuccess = () => {
		this.showLogin = false;
	}
};
