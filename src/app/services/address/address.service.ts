import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Address } from 'src/app/models';
import { environment as e } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient
  ) { }

  getAddressByUser(idUser: number): Observable<any> {
    let param: any = {'idUser': idUser};
    return this.http.get(e.AUTH_API + e.ADDRESS_CONTROLLER + '/byUser', {params: param});
  }

  saveAddress(address: Address): Observable<any> {
    return this.http.post(e.AUTH_API + e.ADDRESS_CONTROLLER + '/createAddress', address);
  }

  updateAddress(address: Address): Observable<any> {
    return this.http.put(e.AUTH_API + e.ADDRESS_CONTROLLER + '/updateAddress', address);
  }

  deleteAddress(idAddress: number): Observable<any> {
    let param: any = {'idAddress': idAddress};
    return this.http.delete(e.AUTH_API + e.ADDRESS_CONTROLLER + '/deleteAddress', {params: param});
  }

}
