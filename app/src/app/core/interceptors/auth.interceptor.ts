import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(TokenStorageService);
  const router = inject(Router);
  const token = storage.getToken();

  if (token && storage.isTokenExpired(token)) {
    storage.signout();
    router.navigate(['/auth/login']);
    return throwError(() => new Error('Session expired. Please sign in again.'));
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        storage.signout();
        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    })
  );
};
