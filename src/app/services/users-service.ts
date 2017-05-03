import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Users } from '../users';

import { CommonService } from './common-service';

@Injectable()
export class UsersService {
	constructor(private http: Http) { }
	//http://efektotest.azurewebsites.net/tables/Users?ZUMO-API-VERSION=2.0.0
	private url = CommonService.baseURl + "Users" + CommonService.postfix;

	getUsers(): Observable<Users[]> {
		let searchUrl = this.url;
		return this.http.get(searchUrl)
			.map(this.extractData)
			.catch(this.handleError);
	}

	getUser(user) {
		let getUrl = CommonService.baseURl + "Users/" + user.id + CommonService.postfix;

		return this.http.get(getUrl, user)
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
