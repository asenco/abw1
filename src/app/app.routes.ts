import { Routes, CanActivate, RouterModule } from '@angular/router';
import {LandingPageComponent} from './landing-page.component';
import {HomeComponent} from './home/home-component';
import {LoginComponent} from './login/login-component';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

export const appRoutes = RouterModule.forRoot([
  { 
      path: '', 
      component: LandingPageComponent },
  {
      path: 'login', 
      component: LoginComponent
  },
  { 
    path: 'home', 
    component: HomeComponent, 
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: 'home' } 
], { 
    useHash: true
    //enableTracing: true // <-- debugging purposes only
  });