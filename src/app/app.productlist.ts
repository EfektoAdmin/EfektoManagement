import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Product } from './product';
import { ProductEditComponent } from './app.productedit';
import { ProductService } from './services/product-service';
import { ProductModalComponent } from './app.productmodal';

@Component({
	selector: 'product-list',
	templateUrl: 'app/templates/products.html',
	providers: [ProductService],
	directives: [ProductEditComponent, ProductModalComponent]
})
export class ProductsComponent implements OnInit {
	products: Product[];
	loading = false;
	mode = 'Observable';

	confirmFlag = false;
	confirmProcess: string = "";
	showModal = false;
	addProduct = false;
	product = {};

	constructor(private productService: ProductService) { }

	ngOnInit() { this.getProducts(); }


	getProducts() {
		this.loading = true;

		this.productService.getProducts()
			.subscribe(
			products => {
				this.products = products;
				this.loading = false;
			});
	}

	newProduct() {
		this.products.push(new Product());


	}

	clicked(product) {
		console.log(product.name);

	}


	showProductModal(addOrEdit) {
		this.showModal = true;

		if (addOrEdit == 'add') {
			this.product = new Product();
			this.addProduct = true;
		}
		else if (addOrEdit == 'edit') {
			this.addProduct = false;
		}

	}

	closeModal = () => {
		this.showModal = false;
	}

	updateProductList = (product: Product) => {
		this.products.push(product);
	}

	updateProduct = (product: Product) => {
		this.product = product;
		this.showProductModal('edit');
	}

	removeProductFromList = (product: Product) => {
		this.products = this.products.filter(item => item.id !== product.id);

	}
}


