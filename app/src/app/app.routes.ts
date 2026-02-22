import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  // LOGIN
  { path: '', redirectTo: 'auth/login', pathMatch: 'prefix' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },

  // DASHBOARD
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then((m) => m.Dashboard),
    canActivate: [AuthGuard],
  },

  // USERS
  {
    path: 'users',
    loadComponent: () => import('./features/users/users.component').then((m) => m.Users),
    canActivate: [AuthGuard],
  },

  // Fallback
  { path: '**', redirectTo: 'dashboard' },
];
