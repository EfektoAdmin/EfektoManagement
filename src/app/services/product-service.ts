import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Product } from './../product';

import { CommonService } from './common-service';

@Injectable()
export class ProductService {
	constructor(private http: Http) { }
	//private url = 'http://efektotest.azurewebsites.net/tables/Product?ZUMO-API-VERSION=2.0.0';
	private url = CommonService.baseURl + "Product" + CommonService.postfix;

	getProducts(): Observable<Product[]> {
		let searchUrl = this.url;
		return this.http.get(searchUrl)
			.map(this.extractData)
			.catch(this.handleError);
	}

	patchProduct(product) {
		let postUrl = this.url + "&id=" + product.id;

		delete product["createdAt"];
		delete product["updatedAt"];
		delete product["deleted"];
		delete product["version"];
		delete product["timestamp"];

		return this.http.patch(this.url, product)
			.map(this.extractData)
			.catch(this.handleError);
	}

	postProduct(product) {
		let postUrl = this.url;
		delete product["timestamp"];
		delete product["version"];

		delete product["id"];
		delete product["createdAt"];
		delete product["updatedAt"];
		delete product["deleted"];

		return this.http.post(this.url, product)
			.map(this.extractData)
			.catch(this.handleError);
	}

	deleteProduct(product) {

		//let deleteUrl = "http://efektotest.azurewebsites.net/tables/Product/" + product.id + "?ZUMO-API-VERSION=2.0.0";
		let deleteUrl = CommonService.baseURl + "Product/" + product.id + CommonService.postfix;

		return this.http.delete(deleteUrl, product)
			.map(this.extractData)
			.catch(this.handleError);
	}



	private extractData(res: Response) {
		let body = res.json();
		return body || [];
	}

	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';

		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
