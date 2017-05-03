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
var category_service_1 = require('./services/category-service');
var CategoryEditComponent = (function () {
    function CategoryEditComponent(categoryService) {
        this.categoryService = categoryService;
        this.category = {};
        this.mode = 'Observable';
        this.saving = false;
    }
    CategoryEditComponent.prototype.ngOnInit = function () { };
    CategoryEditComponent.prototype.deleteCategory = function (category) {
        var _this = this;
        this.saving = true;
        this.categoryService.deleteCategory(category)
            .subscribe(function (responseCategory) {
            console.log("saved");
            _this.saving = false;
            _this.removeCategoryFromListFunction(category);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CategoryEditComponent.prototype, "category", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], CategoryEditComponent.prototype, "callBackFunction", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], CategoryEditComponent.prototype, "removeCategoryFromListFunction", void 0);
    CategoryEditComponent = __decorate([
        core_2.Component({
            selector: 'categoryedit',
            templateUrl: 'app/templates/categoryedit.html',
            providers: [category_service_1.CategoryService]
        }), 
        __metadata('design:paramtypes', [category_service_1.CategoryService])
    ], CategoryEditComponent);
    return CategoryEditComponent;
}());
exports.CategoryEditComponent = CategoryEditComponent;
//# sourceMappingURL=app.categoryedit.js.map