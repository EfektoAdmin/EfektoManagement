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
var category_1 = require('./category');
var category_service_1 = require('./services/category-service');
var tags_1 = require('./tags');
var CategoryModalComponent = (function () {
    function CategoryModalComponent(categoryService) {
        this.categoryService = categoryService;
        this.confirmFlag = false;
        this.confirmProcess = "";
        this.showNotification = false;
        this.notificationMessage = '';
        this.saving = false;
    }
    CategoryModalComponent.prototype.onkeydown = function (e) {
        if (e.key == 'Esc' || e.key == 'Escape')
            this.cancel();
    };
    CategoryModalComponent.prototype.ngOnInit = function () {
        this.editCategory = !this.addCategory;
        this.getCategories();
        if (this.category.tags == null || this.category.tags.trim() == '') {
            this.tagArray = new Array();
            return;
        }
        this.tagArray = category_1.Category.getTagsObjectArray(this.category.tags);
    };
    CategoryModalComponent.prototype.getCategories = function () {
        var _this = this;
        this.categoryService.getCategories()
            .subscribe(function (categories) { return _this.categories = categories; });
    };
    CategoryModalComponent.prototype.cancel = function () {
        this.confirmFlag = true;
        this.confirmProcess = 'cancel';
    };
    CategoryModalComponent.prototype.removeTagItem = function (tagItem) {
        this.tagArray = this.tagArray.filter(function (item) { return item.name !== tagItem.name; });
    };
    CategoryModalComponent.prototype.addTagItem = function () {
        var _this = this;
        if (this.tagItemName == null || this.tagItemName.trim() == '') {
            this.openNotification("The tag <b>name</b> is required.");
            return;
        }
        if (this.tagItemValue == null || this.tagItemValue.trim() == '') {
            this.openNotification("The tag <b>value</b> is required.");
            return;
        }
        var isUsedTagname = false;
        this.tagArray.forEach(function (element) {
            if (element.name == _this.tagItemName) {
                _this.openNotification("The tag <b>name</b> has already been used.");
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
    CategoryModalComponent.prototype.confirm = function (yesOrNo, category) {
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
                        this.saveCategory(this.tempCategory);
                        break;
                    }
            }
        }
        else if (yesOrNo == 'no') {
            this.saving = false;
        }
        this.confirmFlag = false;
    };
    CategoryModalComponent.prototype.saveCategory = function (category) {
        var _this = this;
        if (this.tagArray != null)
            category.tags = JSON.stringify(this.tagArray);
        if (!this.validate(category))
            return;
        // if (category == null || category.name == null || category.name.trim() == "" ||
        //     category.categorytype == null || category.categorytype.trim() == "") {
        //     this.saving = false;
        //     return;
        // }
        this.tempCategory = category;
        if (this.saving == false) {
            this.confirmFlag = true;
            this.confirmProcess = 'save';
            this.saving = true;
            return;
        }
        if (this.addCategory == true) {
            this.categoryService.postCategory(category)
                .subscribe(function (responseCategory) {
                _this.updateCategoryListFunction(category);
                console.log("saved");
                _this.saving = false;
                _this.closeModalFunction();
            });
        }
        else {
            this.categoryService.patchCategory(category)
                .subscribe(function (category) {
                console.log("saved");
                _this.saving = false;
                _this.closeModalFunction();
            });
        }
    };
    CategoryModalComponent.prototype.validate = function (category) {
        this.showNotification = false;
        var message = '';
        if (category == null) {
            message = "No Category available.";
        }
        else {
            if (category.name == null || category.name.trim() == "")
                message += "<b>Name</b> is required. ";
            if (category.categorytype == null || category.categorytype.trim() == "")
                message += "<b>Category</b> Type is required. ";
            if (category.parent != null && category.parent == category.id)
                message += "<b>Category</b> cannot be parent to itself. ";
        }
        if (message == '')
            return true;
        this.openNotification(message);
        return false;
    };
    CategoryModalComponent.prototype.openNotification = function (message) {
        if (message != null)
            this.notificationMessage = message;
        this.showNotification = true;
    };
    CategoryModalComponent.prototype.closeNotification = function () {
        this.notificationMessage = '';
        this.showNotification = false;
    };
    __decorate([
        core_2.Input(), 
        __metadata('design:type', category_1.Category)
    ], CategoryModalComponent.prototype, "category", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Function)
    ], CategoryModalComponent.prototype, "updateCategoryListFunction", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Function)
    ], CategoryModalComponent.prototype, "closeModalFunction", void 0);
    __decorate([
        core_2.Input(), 
        __metadata('design:type', Object)
    ], CategoryModalComponent.prototype, "addCategory", void 0);
    __decorate([
        core_1.HostListener('document:keydown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [KeyboardEvent]), 
        __metadata('design:returntype', void 0)
    ], CategoryModalComponent.prototype, "onkeydown", null);
    CategoryModalComponent = __decorate([
        core_3.Component({
            selector: 'categorymodal',
            templateUrl: 'app/templates/categoryModal.html',
            providers: [category_service_1.CategoryService],
        }), 
        __metadata('design:paramtypes', [category_service_1.CategoryService])
    ], CategoryModalComponent);
    return CategoryModalComponent;
}());
exports.CategoryModalComponent = CategoryModalComponent;
//# sourceMappingURL=app.categorymodal.js.map