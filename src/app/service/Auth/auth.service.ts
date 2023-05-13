import { Injectable } from '@angular/core';
import { Auth } from './Auth';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingService } from '../Loader/loading.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public users: Auth[] = [];
  private REGISTER_API_URL: string = 'http://localhost:3000/api/user/signup';
  private LOGIN_API_URL: string = 'http://localhost:3000/api/user/login';
  private token = '';
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private tokenTimer: any;

  getToken() {
    return this.token;
  }
  
  getAuthenticationStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private loader: LoadingService
  ) {}

  CreateUser(user: Auth, mode: string) {
    this.users.push(user);
    this.http
      .post<{
        message: string;
        user: Auth;
        token: string;
        expiresIn: number;
        Success: boolean;
      }>(mode === 'LOGIN' ? this.LOGIN_API_URL : this.REGISTER_API_URL, user)
      .subscribe((response) => {
        if (mode === 'REGISTER' && response.Success) {
          this.router.navigateByUrl('/login');
        }
        this.token = response.token;
        
        if (response.token) {
          const expirationDuration = response.expiresIn;
          this.setAuthTimer(expirationDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigateByUrl('/products');
          const curentTime = new Date();
          const expirationDate = new Date(
            curentTime.getTime() + expirationDuration * 1000
          );
          this.saveTokenToStorage(response.token, expirationDate);
        }
      });
  
  }

  userAuthentication() {
    const userAuth = this.getAuthenticationData();
    const curentTime = new Date();
    const expirationDuration =
      userAuth?.expirationDate!.getTime()! - curentTime.getTime();
    if (expirationDuration > 0) {
      this.token = userAuth?.token!;
      this.isAuthenticated = true;
      this.setAuthTimer(expirationDuration / 1000);
      this.authStatusListener.next(true);
    }
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  //Function that clears the local storage on logout
  private clearLocalStorage() {
    localStorage.clear();
  }
  // Function  that get Authentication data from local storage also checks if it is defined if not returns null
  private getAuthenticationData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiresIn');
    if (!token || !expirationDate) {
      return null;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
    };
  }
  //Function which saves token data and expiration date to Local storage
  private saveTokenToStorage(token: string, expirationDuration: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiresIn', expirationDuration.toISOString());
  }
  //Functions That logouts the User
  logout() {
    this.token = '';
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigateByUrl('/products');
    clearTimeout(this.tokenTimer);
    this.clearLocalStorage();
  }
}
