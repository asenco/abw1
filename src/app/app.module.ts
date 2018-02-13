import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { appRoutes } from './app.routes';
import { AuthGuardService, AuthenticationService } from './services/auth';
import { UserService } from './services/user.service';
import { LoginComponent } from './login/login-component';
import { HomeComponent } from './home/home-component';
import { LandingPageComponent } from './landing-page.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
/* 
// used to create fake backend
import { fakeBackendProvider } from './helpers';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
 */

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    appRoutes
  ],
  providers: [
    AuthGuardService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    /* 
        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }