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
var core_3 = require('@angular/core');
var product_1 = require('./product');
var product_service_1 = require('./services/product-service');
var tags_1 = require("./tags");
var ProductModalComponent = (function () {
    function ProductModalComponent(productService) {
        this.productService = productService;
        this.confirmFlag = false;
        this.confirmProcess = "";
        this.showNotification = false;
        this.notificationMessage = '';
        this.saving = false;
    }
    ProductModalComponent.prototype.onkeydown = function (e) {
        if (e.key == 'Esc' || e.key == 'Escape')
            this.cancel();
    };
    ProductModalComponent.prototype.ngOnInit = function () {
        this.editProduct = !this.addProduct;
        if (this.product.tags == null || this.product.tags.trim() == '') {
            this.tagArray = new Array();
            return;
        }
        this.tagArray = product_1.Product.getTagsObjectArray(this.product.tags);
    };
    ProductModalComponent.prototype.cancel = function () {
        this.confirmFlag = true;
        this.confirmProcess = 'cancel';
    };
    ProductModalComponent.prototype.removeTagItem = function (tagItem) {
        //this.tagArray = this.tagArray.filter(item => item.name !== tagItem.name && item.value !== tagItem.value);
        this.tagArray = this.tagArray.filter(function (item) { return item.name !== tagItem.name; });
    };
    ProductModalComponent.prototype.addTagItem = function () {
        var _this = this;
        if (this.tagItemName == null || this.tagItemName.trim() == '') {
            this.openNotification("The tag name is required.");
            return;
        }
        if (this.tagItemValue == null || this.tagItemValue.trim() == '') {
            this.openNotification("The tag value is required.");
            return;
        }
        var isUsedTagname = false;
        this.tagArray.forEach(function (element) {
            if (element.name == _this.tagItemName) {
                _this.openNotification("The tag name has already been used.");
                isUsedTagname = true;
                return;
            }
        });
        if (isUsedTagname)
            return;
        var tempTag = new tags_1.Tag();
        tempTag.name = this.tagItemName;
        tempTag.value = this.tagItemValue;
        this.tagArray.push(tempTag);
        this.tagItemName = '';
        this.tagItemValue = '';
    };
    ProductModalComponent.prototype.confirm = function (yesOrNo, product) {
        if (yesOrNo == 'yes') {
            switch (this.confirmProcess) {
                case 'cancel':
                    {
                        this.saving = false;
                        this.closeModalFunction();
                        break;
                    }
                case 'save':
                    {
                        this.saveProduct(this.tempProduct);
                        break;
                    }
            }
        }
        else if (yesOrNo == 'no') {
            this.saving = false;
        }
        this.confirmFlag = false;
    };
    ProductModalComponent.prototype.saveProduct = function (product) {
        var _this = this;
        if (this.tagArray != null)
            product.tags = JSON.stringify(this.tagArray);
        if (!this.validate(product))
            return;
        // if (product == null || product.name == null || product.name.trim() == "") {
        //     this.saving = false;
        //     return;
        // }
        this.tempProduct = product;
        if (this.saving == false) {
            this.confirmFlag = true;
            this.confirmProcess = 'save';
            this.saving = true;
            return;
        }
        if (this.addProduct == true) {
            this.productService.postProduct(product)
                .subscribe(function (responseProduct) {
                _this.updateProductListFunction(product);
                console.log("saved");
                _this.saving = false;
            });
        }
        else {
            this.productService.patchProduct(product)
                .subscribe(function (product) {
                console.log("saved");
                _this.saving = false;
            });
        }
        this.closeModalFunction();
    };
    ProductModalComponent.prototype.validate = function (product) {
        this.showNotification = false;
        var message = '';
        if (product == null) {
            message = "No Category available.";
        }
        else {
            if (product.name == null || product.name.trim() == "")
                message += "Product Name is required.<br />";
            if (product.Description == null || product.Description.trim() == "")
                message += "Product Description is required.<br />";
            if (product.Category == null || product.Category.trim() == "")
                message += "Product Category is required.<br />";
            if (product.Image == null || product.Image.trim() == "")
                message += "Product Image is required.<br />";
            if (product.tags == null || product.tags.trim() == "")
                message += "Product tags is required.<br />";
            if (product.Features == null || product.Features.trim() == "")
                message += "Product Features is required.<br />";
            if (product.ActNo == null || product.ActNo.trim() == "")
                message += "Product ActNo is required.<br />";
            if (product.Warnings == null || product.Warnings.trim() == "")
                message += "Product Warnings is required.<br />";
            if (product.Precautions == null || product.Precautions.trim() == "")
                message += "Product Precautions is required.<br />";
            if (product.Order == null || product.Order.trim() == "")
                message += "Product Order is required.<br />";
        }
        if (message == '')
            return true;
        this.openNotification(message);
        return false;
    };
    ProductModalComponent.prototype.openNotification = function (message) {
        if (message != null)
            this.notificationMessage = message;
        this.showNotification = true;
    };
    ProductModalComponent.prototype.closeNotification = function () {
        this.notificationMessage = '';
        this.showNotification = false;
    };
    __decorate([
        core_2.Input(), 
        __metadata('design:type', product_1.Product)
    ], ProductModalComponent.prototype, "product", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Function)
    ], ProductModalComponent.prototype, "updateProductListFunction", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Function)
    ], ProductModalComponent.prototype, "closeModalFunction", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], ProductModalComponent.prototype, "addProduct", void 0);
    __decorate([
        core_1.HostListener('document:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], ProductModalComponent.prototype, "onkeydown", null);
    ProductModalComponent = __decorate([
        core_3.Component({
            selector: 'productmodal',
            templateUrl: 'app/templates/productModal.html',
            providers: [product_service_1.ProductService],
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService])
    ], ProductModalComponent);
    return ProductModalComponent;
}());
exports.ProductModalComponent = ProductModalComponent;
//# sourceMappingURL=app.productmodal.js.map