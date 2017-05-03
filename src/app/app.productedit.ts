import { OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from './services/product-service';

@Component({
	selector: 'productedit',
	templateUrl: 'app/templates/productedit.html',
	providers: [ProductService]
})
export class ProductEditComponent implements OnInit {
	@Input() product = {};
	@Input() public updateProductFunction: Function;
	@Input() public removeProductFromListFunction: Function;

	mode = 'Observable';
	constructor(private productService: ProductService) { }

	saving = false;
	ngOnInit() { }

	updateProduct(product: Product) {

		if (product.id) {
			this.saving = true;
			this.productService.patchProduct(product)
				.subscribe(
				product => {
					console.log("saved");
					this.saving = false;
				});
		} else {
			this.saving = true;
			this.productService.postProduct(product)
				.subscribe(
				product => {
					console.log("saved");
					this.saving = false;
				});
		}


	}

	duplicateProduct(product: Product) {
		this.saving = true;
		this.productService.postProduct(product)
			.subscribe(
			product => {
				console.log("saved");
				this.saving = false;
			});

	}

	deleteProduct(product: Product) {
		this.saving = true;
		this.productService.deleteProduct(product)
			.subscribe(
			reponseProduct => {
				console.log("saved");
				this.saving = false;
				this.removeProductFromListFunction(product);
			});

	}



}


