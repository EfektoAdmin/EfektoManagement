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
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        //private url = 'http://efektotest.azurewebsites.net/tables/Product?ZUMO-API-VERSION=2.0.0';
        this.url = common_service_1.CommonService.baseURl + "Product" + common_service_1.CommonService.postfix;
    }
    ProductService.prototype.getProducts = function () {
        var searchUrl = this.url;
        return this.http.get(searchUrl)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.patchProduct = function (product) {
        var postUrl = this.url + "&id=" + product.id;
        delete product["createdAt"];
        delete product["updatedAt"];
        delete product["deleted"];
        delete product["version"];
        delete product["timestamp"];
        return this.http.patch(this.url, product)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.postProduct = function (product) {
        var postUrl = this.url;
        delete product["timestamp"];
        delete product["version"];
        delete product["id"];
        delete product["createdAt"];
        delete product["updatedAt"];
        delete product["deleted"];
        return this.http.post(this.url, product)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.deleteProduct = function (product) {
        //let deleteUrl = "http://efektotest.azurewebsites.net/tables/Product/" + product.id + "?ZUMO-API-VERSION=2.0.0";
        var deleteUrl = common_service_1.CommonService.baseURl + "Product/" + product.id + common_service_1.CommonService.postfix;
        return this.http.delete(deleteUrl, product)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.extractData = function (res) {
        var body = res.json();
        return body || [];
    };
    ProductService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    };
    ProductService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product-service.js.map