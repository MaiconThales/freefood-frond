import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment as e } from '../../../environments/environment.prod';
import { LoginRequest, SignupRequest } from '../../models';
import { TokenStorageService } from '../';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private tokenStorageService: TokenStorageService
  ) { }

  login(userLogin: LoginRequest): Observable<any> {
    return this.http.post(e.AUTH_API + e.USER_CONTROLLER + '/auth/signin', userLogin, httpOptions);
  }

  register(userData: SignupRequest): Observable<any> {
    return this.http.post(e.AUTH_API + e.USER_CONTROLLER + '/auth/signup', userData, httpOptions);
  }

  refreshToken(token: string) {
    return this.http.post(e.AUTH_API + e.USER_CONTROLLER + '/auth/refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }

  isLogged(): Observable<any> {
    return this.http.get(e.AUTH_API + e.USER_CONTROLLER + '/auth/isLogged');
  }

  public isAuthenticated(): boolean {
    const token = this.tokenStorageService.getToken();

    if(token != undefined) {
      return !this.jwtHelper.isTokenExpired(token);
    } else {
      return false;
    }
  }

}
