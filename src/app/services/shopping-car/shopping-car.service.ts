import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { Menu } from 'src/app/models';

const SHOPPING_KEY = 'shopping-car';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCarService {

  constructor(
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) { }

  getShoppingCar(): Menu[] {
    let value = window.sessionStorage.getItem(SHOPPING_KEY);
    let result = [];

    if(value != null) {
      result = JSON.parse(value);
    }

    return result;
  }

  addMenuInShoppingCar(menu: Menu): void {
    let tempSession = window.sessionStorage.getItem(SHOPPING_KEY);
    let infoSession = [];
    if(tempSession != null) {
      infoSession = JSON.parse(tempSession);
    }
    if(!this.verifyItemExists(menu)) {
      infoSession.push(menu);
      window.sessionStorage.setItem(SHOPPING_KEY, JSON.stringify(infoSession));
      this.showSnackBar('GLOBAL_WORD.MSG_ADD_SHOPPING_CAR');
    } else {
      this.showSnackBar('GLOBAL_WORD.MSG_ITEM_REPEAT');
    }
  }

  verifyItemExists(menu: Menu): boolean {
    let items = this.getShoppingCar();

    if(items.length > 0) {
      for(let i=0; i<items.length; i++) {
        if(items[i].idMenu == menu.idMenu) {
          return true;
        }
      }
    }

    return false;
  }

  removeMenuInShoppingCar(idMenu: number): void {
    let items = this.getShoppingCar();
    window.sessionStorage.removeItem(SHOPPING_KEY);
    if(items.length > 1) {
      for(let i=0; i<items.length; i++) {
        if(items[i].idMenu == idMenu) {
          items.splice(i, 1);
          break;
        }
      }
      window.sessionStorage.setItem(SHOPPING_KEY, JSON.stringify(items));
    }
    this.showSnackBar('GLOBAL_WORD.MSG_REMOVE');
  }

  showSnackBar(msg: string): void {
    this.snackBar.open(this.translate.instant(msg), 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 10000
    });
  }

}
