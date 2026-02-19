import { Routes } from '@angular/router';

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
  },

  // USERS
  {
    path: 'users',
    loadComponent: () => import('./features/users/users.component').then((m) => m.Users),
  },

  // Fallback
  { path: '**', redirectTo: 'dashboard' },
];
