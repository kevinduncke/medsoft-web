import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiUrl + '/auth';

  constructor(
    private http: HttpClient,
    private storage: TokenStorageService,
  ) {}

  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.api}/login`, data).pipe(
      tap((res) => {
        this.storage.setToken(res.accessToken);
        this.storage.setUser(res.user);
      }),
    );
  }

  register(data: any) {
    return this.http.post(`${environment.apiUrl}/auth/register`, data);
  }

  logout() {
    this.storage.clear();
  }
}
