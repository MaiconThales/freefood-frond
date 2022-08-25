import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MyErrorStateMatcher } from 'src/app/shared';
import { Address } from 'src/app/models';
import { TokenStorageService } from 'src/app/services';

@Component({
  selector: 'app-address-user',
  templateUrl: './address-user.component.html',
  styleUrls: ['./address-user.component.css']
})
export class AddressUserComponent {

  addressForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<AddressUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Address,
    private token: TokenStorageService
  ) {
    this.createFormUser(data);
  }

  createFormUser(address: Address): void {
    this.addressForm = new FormGroup({
      id: new FormControl((address != null && address.id != null) ? address.id : ''),
      street: new FormControl((address != null && address.street != null) ? address.street : '', [Validators.required]),
      district: new FormControl((address != null && address.district != null) ? address.district : '', [Validators.required]),
      number: new FormControl((address != null && address.number != null) ? address.number : '', [Validators.required]),
      complement: new FormControl((address != null && address.complement != null) ? address.complement : ''),
      isDefault: new FormControl((address != null && address.isDefault != null) ? address.isDefault : false),
      user: new FormControl((address != null && address.user != null) ? address.user : null)
    });
  }

  onSubmit(): void {
    let address: Address;
    address = {
      id: this.addressForm.get('id')?.value,
      street: this.addressForm.get('street')?.value,
      district: this.addressForm.get('district')?.value,
      number: this.addressForm.get('number')?.value,
      complement: this.addressForm.get('complement')?.value,
      isDefault: this.addressForm.get('isDefault')?.value,
      user: this.addressForm.get('user')?.value != null ? this.addressForm.get('user')?.value : {id: this.token.getIdUser()}
    }
    
    this.dialogRef.close(address);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
