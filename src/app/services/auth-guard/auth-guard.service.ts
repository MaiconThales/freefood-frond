import { Injectable } from '@angular/core';
import { Router, CanActivate, CanLoad } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthService } from '../';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanLoad, CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router,
  ) { }

  canLoad(): Observable<boolean> | boolean {
    let result = this.authService.isLogged().pipe(
      map(() => {
        if(this.authService.isAuthenticated()) {
          return true;
        }
        return false;
      })
    );
    return result;
  }

  canActivate(): Observable<boolean> | boolean {
    let result = this.authService.isLogged().pipe(
      map(() => {
        if(this.authService.isAuthenticated()) {
          return true;
        }
        return false;
      })
    );
    return result;
  }

}
