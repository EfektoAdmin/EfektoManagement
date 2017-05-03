import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Users } from '../users';
import { CommonService } from './common-service';

@Injectable()
export class ProfileService {
    constructor(private http: Http) { }


    postCategory(category) {

        let url = CommonService.baseURl + "Profile/" + CommonService.postfix;

        return this.http.post(url, category)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        let returnValue = [];
        for (var i = 0; i < body.length; i++) {
            let category = new Users();
            category.Username = body[i].id;
            category.Password = body[i].name;
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