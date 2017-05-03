"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var common_service_1 = require('./common-service');
var UsersService = (function () {
    function UsersService(http) {
        this.http = http;
        //http://efektotest.azurewebsites.net/tables/Users?ZUMO-API-VERSION=2.0.0
        this.url = common_service_1.CommonService.baseURl + "Users" + common_service_1.CommonService.postfix;
    }
    UsersService.prototype.getUsers = function () {
        var searchUrl = this.url;
        return this.http.get(searchUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UsersService.prototype.getUser = function (user) {
        var getUrl = common_service_1.CommonService.baseURl + "Users/" + user.id + common_service_1.CommonService.postfix;
        return this.http.get(getUrl, user)
            .map(this.extractData)
            .catch(this.handleError);
    };
    UsersService.prototype.extractData = function (res) {
        var body = res.json();
        return body || [];
    };
    UsersService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    UsersService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users-service.js.map