import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  login(loginUserRequest: User): Observable<User> {
    return this.http.post<User>(
      this.baseApiUrl + '/api/user/authenticate',
      loginUserRequest
    );
  }

  addUser(addUserRequest: User): Observable<User> {
    return this.http.post<User>(this.baseApiUrl + '/api/user', addUserRequest);
  }
}
