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
var category_1 = require('./../category');
var common_service_1 = require('./common-service');
var CategoryService = (function () {
    function CategoryService(http) {
        this.http = http;
        //private url = 'http://efektotest.azurewebsites.net/tables/Categories?ZUMO-API-VERSION=2.0.0';
        this.url = common_service_1.CommonService.baseURl + "Categories" + common_service_1.CommonService.postfix;
    }
    CategoryService.prototype.getCategories = function () {
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CategoryService.prototype.patchCategory = function (category) {
        this.url += "&id=" + category.id;
        return this.http.patch(this.url, category)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CategoryService.prototype.postCategory = function (category) {
        return this.http.post(this.url, category)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CategoryService.prototype.deleteCategory = function (category) {
        //let deleteUrl = "http://efektotest.azurewebsites.net/tables/Categories/" +  category.id + "?ZUMO-API-VERSION=2.0.0";
        var deleteUrl = common_service_1.CommonService.baseURl + "Categories/" + category.id + common_service_1.CommonService.postfix;
        return this.http.delete(deleteUrl, category)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CategoryService.prototype.extractData = function (res) {
        var body = res.json();
        var returnValue = [];
        for (var i = 0; i < body.length; i++) {
            var category = new category_1.Category();
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
        }
        ;
        return returnValue;
    };
    CategoryService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    CategoryService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CategoryService);
    return CategoryService;
}());
exports.CategoryService = CategoryService;
//# sourceMappingURL=category-service.js.map