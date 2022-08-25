import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as e } from '../../../environments/environment.prod';
import { Restaurant } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private http: HttpClient
  ) { }

  saveRestaurant(restaurant: Restaurant): Observable<any> {
    return this.http.post(e.AUTH_API + e.RESTAURANT_CONTROLLER + '/createRestaurant', restaurant);
  }

  getRestaurant(idUser: number): Observable<any> {
    let param: any = {'idUser': idUser};
    return this.http.get(e.AUTH_API + e.RESTAURANT_CONTROLLER + '/getRestaurant', { params: param });
  }

  removeRestaurant(idRestaurant: number, idUser: number): Observable<any> {
    let param: any = { 'idRestaurant': idRestaurant, 'idUser': idUser }
    return this.http.delete(e.AUTH_API + e.RESTAURANT_CONTROLLER + '/deleteRestaurant', { params: param })
  }

  updateRestaurant(restaurant: Restaurant, idUser: number) : Observable<any> {
    let param: any = { 'idUser': idUser }
    return this.http.put(e.AUTH_API + e.RESTAURANT_CONTROLLER + '/updateRestaurant', restaurant, { params: param })
  }

  liberateRestaurant(restaurant: Restaurant, idUser: number, username: String): Observable<any> {
    let param: any = { 'idUser': idUser, 'username': username }
    return this.http.put(e.AUTH_API + e.RESTAURANT_CONTROLLER + '/liberateRestaurant', restaurant, { params: param })
  }

  getAllRestaurant(): Observable<any> {
    return this.http.get(e.AUTH_API + e.RESTAURANT_CONTROLLER + '/getAllRestaurant');
  }

}
