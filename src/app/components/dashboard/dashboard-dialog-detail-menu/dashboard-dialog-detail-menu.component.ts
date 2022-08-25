import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Menu } from 'src/app/models';
import { ShoppingCarService } from 'src/app/services';

@Component({
  selector: 'app-dashboard-dialog-detail-menu',
  templateUrl: './dashboard-dialog-detail-menu.component.html',
  styleUrls: ['./dashboard-dialog-detail-menu.component.css']
})
export class DashboardDialogDetailMenuComponent {

  constructor(
    public dialogRef: MatDialogRef<DashboardDialogDetailMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Menu,
    private shoppingCar: ShoppingCarService
  ) {
  }

  addShoppingCar(): void {
    this.shoppingCar.addMenuInShoppingCar(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
