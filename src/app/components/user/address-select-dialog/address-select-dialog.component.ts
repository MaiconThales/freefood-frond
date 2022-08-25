import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { Address } from 'src/app/models';

@Component({
  selector: 'app-address-select-dialog',
  templateUrl: './address-select-dialog.component.html',
  styleUrls: ['./address-select-dialog.component.css']
})
export class AddressSelectDialogComponent {

  selectAddressId!: number;
  selectAddress!: Address;
  address!: Address[];

  constructor(
    public dialogRef: MatDialogRef<AddressSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService
  ) { 
    this.address = data.address;
    this.setAddressSelect();
  }

  setAddressSelect(): void {
    this.selectAddressId = this.data.addressSelect.id;
  }

  alterAddress(): void {
    this.address.forEach((a) => {
      if(a.id == this.selectAddressId) {
        this.selectAddress = a;
      }
    });
    this.dialogRef.close(this.selectAddress);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
