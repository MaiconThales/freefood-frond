import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { MyErrorStateMatcher } from 'src/app/shared';

@Component({
  selector: 'app-restaurant-liberate',
  templateUrl: './restaurant-liberate.component.html',
  styleUrls: ['./restaurant-liberate.component.css']
})
export class RestaurantLiberateComponent {

  userForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<RestaurantLiberateComponent>
  ) {
    this.createForm();
  }

  createForm(): void {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required])
    });
  }

  onSubmit(): void {
    let username = this.userForm.get('username')?.value;
    this.dialogRef.close(username);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
