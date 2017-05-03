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
var users_service_1 = require('./services/users-service');
var LoginComponent = (function () {
    function LoginComponent(usersService) {
        this.usersService = usersService;
        this.user = { 'Username': '', 'Password': '' };
        this.showOverlay = false;
        this.loading = false;
        this.showNotification = false;
        this.notificationMessage = '';
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.login = function (username, password) {
        var _this = this;
        this.loading = true;
        this.showOverlay = true;
        this.showNotification = false;
        this.notificationMessage = '';
        if (username == null || username.trim() == '')
            this.notificationMessage = 'Username is required. ';
        if (password == null || password.trim() == '')
            this.notificationMessage += 'Password is required.';
        if (this.notificationMessage != null && this.notificationMessage.trim() != '') {
            this.openNotification(null);
            this.showOverlay = false;
            this.loading = false;
            return;
        }
        var usersList;
        this.usersService.getUsers()
            .subscribe(function (usersResponse) {
            usersResponse.forEach(function (element) {
                if (username == element.Username && password == element.Password) {
                    _this.loading = false;
                    _this.showOverlay = false;
                    _this.loginSuccess();
                }
                else {
                    _this.showOverlay = false;
                    _this.loading = false;
                    _this.openNotification("The username or password is incorrect");
                }
            });
        });
    };
    LoginComponent.prototype.openNotification = function (message) {
        if (message != null)
            this.notificationMessage = message;
        this.showOverlay = false;
        this.showNotification = true;
    };
    LoginComponent.prototype.closeNotification = function () {
        this.notificationMessage = '';
        this.showOverlay = false;
        this.showNotification = false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], LoginComponent.prototype, "loginSuccess", void 0);
    LoginComponent = __decorate([
        core_2.Component({
            selector: 'login',
            templateUrl: 'app/templates/login.html',
            providers: [users_service_1.UsersService],
        }), 
        __metadata('design:paramtypes', [users_service_1.UsersService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=app.login.js.map