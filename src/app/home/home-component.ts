import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './../services/auth/authentication.service';
import { Component, OnInit } from '@angular/core';

import { User } from '../model';
import { UserService } from '../services';

@Component({
    selector: 'home',
    templateUrl: 'home-component.html'
})
export class HomeComponent implements OnInit {
    users: User[] = [];
    currentUser: User;

    constructor(private userService: UserService,
        private router: Router,
        private authSvc: AuthenticationService) { }

    ngOnInit() {
        // get users from secure api end point
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users as User[];
            });
        this.userService.getCurrentUser()
            .subscribe((user) => {
                this.currentUser = user as User;
            });
    }

    logout() {
        this.authSvc.logout();
        this.router.navigate(['login']); ``
    }
}