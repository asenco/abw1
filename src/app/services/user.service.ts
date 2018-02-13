import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { AuthenticationService } from '../services';
import { User } from '../model';

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService) {
    }

    getUsers(){
        // get users from api
        return this.http.get('/api/users');
    }

    getCurrentUser(){
        return this.http.get('/api/getCurrentUser')
        .map((result)=>{ console.log('current user:', result); return result;});
    }
}