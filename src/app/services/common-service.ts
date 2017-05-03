import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CommonService {
	constructor() { }

    public static baseURl = 'https://efektotest.azurewebsites.net/tables/';
    public static postfix = '?ZUMO-API-VERSION=2.0.0';


}
