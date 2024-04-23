import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fullName$ = new BehaviorSubject<string>('');
  private role$ = new BehaviorSubject<string>('');
  private userPayload: any;

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  login(loginUserRequest: User): Observable<any> {
    return this.http.post<User>(
      this.baseApiUrl + '/api/user/authenticate',
      loginUserRequest
    );
  }

  logout() {
    // localStorage.clear();
    localStorage.removeItem('token');
    alert('You have been successfully logged out.');
    this.router.navigate(['/login']);
  }

  addUser(addUserRequest: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/api/user', addUserRequest);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  isLoggedIn(): boolean {
    // if (localStorage.getItem('token')) {
    //   return true;
    // } else {
    //   return false;
    // }
    return !!localStorage.getItem('token');
  }

  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }
  public setFullNameForStore(fullName: string) {
    this.fullName$.next(fullName);
  }

  getFullNameFromToken() {
    if (this.userPayload) {
      return this.userPayload.unique_name;
    }
  }

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  getRoleFromToken() {
    if (this.userPayload) {
      return this.userPayload.role;
    }
  }
}
