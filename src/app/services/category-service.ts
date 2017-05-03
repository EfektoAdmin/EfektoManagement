import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Category } from './../category';

import { CommonService } from './common-service';

@Injectable()
export class CategoryService {
	constructor(private http: Http) { }
	//private url = 'http://efektotest.azurewebsites.net/tables/Categories?ZUMO-API-VERSION=2.0.0';
	private url = CommonService.baseURl + "Categories" + CommonService.postfix;

	getCategories(): Observable<Category[]> {

		return this.http.get(this.url)
			.map(this.extractData)
			.catch(this.handleError);
	}
	patchCategory(category) {
		this.url += "&id=" + category.id;
		return this.http.patch(this.url, category)
			.map(this.extractData)
			.catch(this.handleError);
	}

	postCategory(category) {
		return this.http.post(this.url, category)
			.map(this.extractData)
			.catch(this.handleError);
	}

	deleteCategory(category) {
		//let deleteUrl = "http://efektotest.azurewebsites.net/tables/Categories/" +  category.id + "?ZUMO-API-VERSION=2.0.0";
		let deleteUrl = CommonService.baseURl + "Categories/" +  category.id + CommonService.postfix;

		return this.http.delete(deleteUrl, category)
		.map(this.extractData)
		.catch(this.handleError);
	}

	private extractData(res: Response) {
		let body = res.json();
		let returnValue = [];
		for (var i = 0; i < body.length; i++) {
			let category = new Category();
			category.id = body[i].id;
			category.name = body[i].name;
			category.Order = body[i].Order;
			category.parent = body[i].parent;
			category.categorytype = body[i].categorytype;
			category.description = body[i].description;
			category.image = body[i].image;
			category.hasproducts = body[i].hasproducts ? 1 : 0;
			category.tags = body[i].tags;
			returnValue.push(category);
		};

		return returnValue;
	}

	private handleError(error: any) {
		let errMsg = (error.message) ? error.message :
			error.status ? `${error.status} - ${error.statusText}` : 'Server error';

		console.error(errMsg);
		return Observable.throw(errMsg);
	}
}
