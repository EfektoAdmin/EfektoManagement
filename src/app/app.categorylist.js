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
var category_1 = require('./category');
var app_categoryedit_1 = require('./app.categoryedit');
var app_categorymodal_1 = require('./app.categorymodal');
var category_service_1 = require('./services/category-service');
var CategoriesComponent = (function () {
    function CategoriesComponent(categoryService) {
        var _this = this;
        this.categoryService = categoryService;
        this.mode = 'Observable';
        this.confirmFlag = false;
        this.confirmProcess = "";
        this.saving = false;
        this.showModal = false;
        this.addCategory = false;
        this.category = {};
        this.closeModal = function () {
            _this.showModal = false;
            _this.getCategories();
        };
        this.updateCategoryList = function (category) {
            _this.categories.push(category);
        };
        this.updateCategory = function (category) {
            _this.category = category;
            _this.showCategoryModal('edit');
        };
        this.removeCategoryFromList = function (category) {
            _this.categories = _this.categories.filter(function (item) { return item.id !== category.id; });
        };
    }
    CategoriesComponent.prototype.ngOnInit = function () { this.getCategories(); };
    CategoriesComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoryService.getCategories()
            .subscribe(function (categories) { return _this.categories = categories; });
    };
    CategoriesComponent.prototype.showCategoryModal = function (addOrEdit) {
        this.showModal = true;
        if (addOrEdit == 'add') {
            this.category = new category_1.Category();
            this.addCategory = true;
        }
        else if (addOrEdit == 'edit') {
            this.addCategory = false;
        }
    };
    CategoriesComponent = __decorate([
        core_1.Component({
            selector: 'category-list',
            templateUrl: 'app/templates/categories.html',
            providers: [category_service_1.CategoryService],
            directives: [app_categoryedit_1.CategoryEditComponent, app_categorymodal_1.CategoryModalComponent]
        }), 
        __metadata('design:paramtypes', [category_service_1.CategoryService])
    ], CategoriesComponent);
    return CategoriesComponent;
}());
exports.CategoriesComponent = CategoriesComponent;
//# sourceMappingURL=app.categorylist.js.map