import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(TokenStorageService);
  const token = storage.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('TOKEN: ', token);
  }

  console.log('INTERCEPTOR RUNNING');

  return next(req);
};
