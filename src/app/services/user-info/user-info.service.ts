import { Injectable, EventEmitter } from '@angular/core';

import { JwtResponse } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  showMenu = new EventEmitter<boolean>();
  loader = new EventEmitter<boolean>();
  user = new EventEmitter<JwtResponse>();

  constructor() { }

  setValueUser(u: JwtResponse): void {
    this.user.emit(u);
  }

  alterValue(value: boolean): void {
    this.showMenu.emit(value);
  }

  setValueLoader(value: boolean): void {
    this.loader.emit(value);
  }
  
}
