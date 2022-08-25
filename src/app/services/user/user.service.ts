import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { environment as e } from '../../../environments/environment.prod';
import { LogOutRequest, User } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getDataUser(idUser: number): Observable<any> {
    let param: any = {'idUser': idUser};
    return this.http.get(e.AUTH_API + e.USER_CONTROLLER + '/findId', { params: param });
  }

  alterDataUser(user: User): Observable<any> {
    return this.http.put(e.AUTH_API + e.USER_CONTROLLER + '/updateUser', user );
  }

  logoutUser(logOutRequest: LogOutRequest): Observable<any> {
    return this.http.post(e.AUTH_API + e.USER_CONTROLLER + '/auth/logout', logOutRequest);
  }

  saveMenuUser(file: any): Observable<any> {
    return this.http.post(`${e.AUTH_API}${e.USER_CONTROLLER}/saveImageUser`, file).pipe(
      map((data: any) => {
        return data;
      }));
  }
  
}
