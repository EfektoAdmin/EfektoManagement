import { OnInit, HostListener, Input } from '@angular/core';
import { Component } from '@angular/core';

import { UsersService } from './services/users-service';
import { Users } from "./users";

@Component({
    selector: 'login',
    templateUrl: 'app/templates/login.html',
    providers: [UsersService],
    //directives: [CategoryEditComponent, CategoryModalComponent]
})
export class LoginComponent implements OnInit {

    @Input() public loginSuccess: Function;

    user = { 'Username': '', 'Password': '' };

    showOverlay = false;
    loading = false;
    showNotification = false;
    notificationMessage = '';

    constructor(private usersService: UsersService) { }

    ngOnInit() { }

    login(username: string, password: string) {

        this.loading = true;
        this.showOverlay = true;
        this.showNotification = false;
        this.notificationMessage = '';
        
        if (username == null || username.trim() == '')
            this.notificationMessage = '<b>Username</b> is required. ';

        if (password == null || password.trim() == '')
            this.notificationMessage += '<b>Password</b> is required.';

        if (this.notificationMessage != null && this.notificationMessage.trim() != '') {
            this.openNotification(null);
            this.showOverlay = false;
            this.loading = false;
            return;
        }

        var usersList: Users[];
        this.usersService.getUsers()
            .subscribe(
            usersResponse => {
                usersResponse.forEach(element => {
                    if (username == element.Username && password == element.Password) {
                        this.loading = false;
                        this.showOverlay = false;
                        this.loginSuccess();
                    }
                    else {
                        this.showOverlay = false;
                        this.loading = false;
                        this.openNotification("The username or password is incorrect");
                    }
                });
            });
    }

    openNotification(message) {
        if (message != null)
            this.notificationMessage = message;

        this.showOverlay = false;
        this.showNotification = true;
    }

    closeNotification() {
        this.notificationMessage = '';
        this.showOverlay = false;
        this.showNotification = false;
    }
}
