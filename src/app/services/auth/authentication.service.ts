import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from "moment";
import 'rxjs/add/operator/map';
import { LoginResponse } from '../../model/login-response';
 
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) {
    }
 
    login(username: string, password: string): Observable<boolean> {
        return this.http.post('/api/authenticate', { username: username, password: password })
            .map((response: LoginResponse) => {
                console.log('response:', response); 
                // login successful if there's a jwt token in the response
                let token = response.token;
                console.log('got token:', token);
                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    const expiresAt = moment().add(response.expiresIn,'second');
                    localStorage.setItem('id_token', token );
                    console.log('checking token set:', localStorage.getItem('id_token'));
                    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
 
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }
}