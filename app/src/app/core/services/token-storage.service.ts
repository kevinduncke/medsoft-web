import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  signout() {
    console.log('Removing user token and user data from localStorage');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLoggedIn(){
    return !!this.getToken();
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  clear() {
    localStorage.clear();
  }
}
