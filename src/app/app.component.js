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
var app_productlist_1 = require('./app.productlist');
var app_categorylist_1 = require('./app.categorylist');
var app_login_1 = require('./app.login');
var AppComponent = (function () {
    function AppComponent() {
        var _this = this;
        this.showLogin = true;
        this.showCategories = true;
        this.showProducts = false;
        this.loginSuccess = function () {
            _this.showLogin = false;
        };
    }
    AppComponent.prototype.showComponent = function (componentName) {
        if (componentName == "categories") {
            this.showCategories = true;
            this.showProducts = false;
        }
        else {
            this.showCategories = false;
            this.showProducts = true;
        }
    };
    AppComponent.prototype.logout = function () {
        this.showLogin = true;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'efekto-management-app',
            templateUrl: 'app/templates/main.html',
            directives: [app_categorylist_1.CategoriesComponent, app_productlist_1.ProductsComponent, app_login_1.LoginComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
;
//# sourceMappingURL=app.component.js.map