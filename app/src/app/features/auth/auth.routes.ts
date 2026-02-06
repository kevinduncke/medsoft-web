import { Routes } from '@angular/router';
import { Login } from './pages/login/login.component';
import { Register } from './pages/register/register.component';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
