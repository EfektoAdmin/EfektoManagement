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
var core_2 = require('@angular/core');
var product_service_1 = require('./services/product-service');
var ProductEditComponent = (function () {
    function ProductEditComponent(productService) {
        this.productService = productService;
        this.product = {};
        this.mode = 'Observable';
        this.saving = false;
    }
    ProductEditComponent.prototype.ngOnInit = function () { };
    ProductEditComponent.prototype.updateProduct = function (product) {
        var _this = this;
        if (product.id) {
            this.saving = true;
            this.productService.patchProduct(product)
                .subscribe(function (product) {
                console.log("saved");
                _this.saving = false;
            });
        }
        else {
            this.saving = true;
            this.productService.postProduct(product)
                .subscribe(function (product) {
                console.log("saved");
                _this.saving = false;
            });
        }
    };
    ProductEditComponent.prototype.duplicateProduct = function (product) {
        var _this = this;
        this.saving = true;
        this.productService.postProduct(product)
            .subscribe(function (product) {
            console.log("saved");
            _this.saving = false;
        });
    };
    ProductEditComponent.prototype.deleteProduct = function (product) {
        var _this = this;
        this.saving = true;
        this.productService.deleteProduct(product)
            .subscribe(function (reponseProduct) {
            console.log("saved");
            _this.saving = false;
            _this.removeProductFromListFunction(product);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ProductEditComponent.prototype, "product", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], ProductEditComponent.prototype, "updateProductFunction", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], ProductEditComponent.prototype, "removeProductFromListFunction", void 0);
    ProductEditComponent = __decorate([
        core_2.Component({
            selector: 'productedit',
            templateUrl: 'app/templates/productedit.html',
            providers: [product_service_1.ProductService]
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService])
    ], ProductEditComponent);
    return ProductEditComponent;
}());
exports.ProductEditComponent = ProductEditComponent;
//# sourceMappingURL=app.productedit.js.map