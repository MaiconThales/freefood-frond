import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserInfoService, UserService } from '../index';
import { LogOutRequest } from '../../models';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const REFRESHTOKEN_KEY = 'auth-refreshtoken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(
    private userInfoService: UserInfoService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  public signOut(): void {
    let logOutRequest: LogOutRequest = {userId: this.getUser().id};
    this.userService.logoutUser(logOutRequest).subscribe({
      error: err => {
        this.snackBar.open(err.menssage, 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
    window.sessionStorage.clear();
    this.userInfoService.alterValue(false);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getToken(): string | null {
    var token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token != null) {
      this.userInfoService.alterValue(true);
    }
    return token;
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESHTOKEN_KEY);
    window.sessionStorage.setItem(REFRESHTOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESHTOKEN_KEY);
  }

  public getIdUser(): number {
    let userId = this.getUser().id;
    return userId;
  }

}
