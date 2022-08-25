import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Request } from 'src/app/models';
import { environment as e } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  saveRequest(request: Request[]): Observable<any> {
    return this.http.post(`${e.AUTH_API}${e.REQUEST_CONTROLLER}/createRequest`, request);
  }

  getRequestByUser(idUser: number): Observable<any> {
    let param: any = {'idUser': idUser};
    return this.http.get(`${e.AUTH_API}${e.REQUEST_CONTROLLER}/listRequestByUser`, {params: param} );
  }

}
