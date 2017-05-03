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
var product_1 = require('./product');
var app_productedit_1 = require('./app.productedit');
var product_service_1 = require('./services/product-service');
var app_productmodal_1 = require('./app.productmodal');
var ProductsComponent = (function () {
    function ProductsComponent(productService) {
        var _this = this;
        this.productService = productService;
        this.loading = false;
        this.mode = 'Observable';
        this.confirmFlag = false;
        this.confirmProcess = "";
        this.showModal = false;
        this.addProduct = false;
        this.product = {};
        this.closeModal = function () {
            _this.showModal = false;
        };
        this.updateProductList = function (product) {
            _this.products.push(product);
        };
        this.updateProduct = function (product) {
            _this.product = product;
            _this.showProductModal('edit');
        };
        this.removeProductFromList = function (product) {
            _this.products = _this.products.filter(function (item) { return item.id !== product.id; });
        };
    }
    ProductsComponent.prototype.ngOnInit = function () { this.getProducts(); };
    ProductsComponent.prototype.getProducts = function () {
        var _this = this;
        this.loading = true;
        this.productService.getProducts()
            .subscribe(function (products) {
            _this.products = products;
            _this.loading = false;
        });
    };
    ProductsComponent.prototype.newProduct = function () {
        this.products.push(new product_1.Product());
    };
    ProductsComponent.prototype.clicked = function (product) {
        console.log(product.name);
    };
    ProductsComponent.prototype.showProductModal = function (addOrEdit) {
        this.showModal = true;
        if (addOrEdit == 'add') {
            this.product = new product_1.Product();
            this.addProduct = true;
        }
        else if (addOrEdit == 'edit') {
            this.addProduct = false;
        }
    };
    ProductsComponent = __decorate([
        core_1.Component({
            selector: 'product-list',
            templateUrl: 'app/templates/products.html',
            providers: [product_service_1.ProductService],
            directives: [app_productedit_1.ProductEditComponent, app_productmodal_1.ProductModalComponent]
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService])
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=app.productlist.js.map