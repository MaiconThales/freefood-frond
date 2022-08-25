import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-request-dialog-detail',
  templateUrl: './request-dialog-detail.component.html',
  styleUrls: ['./request-dialog-detail.component.css']
})
export class RequestDialogDetailComponent {

  requestForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RequestDialogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.getObjRequest(this.data);
  }

  getObjRequest(obj: any): any {
    this.requestForm = new FormGroup({
      address: new FormControl({value: obj.address, disabled: true}),
      amount: new FormControl({value: obj.amount, disabled: true}),
      observation: new FormControl({value: obj.observation, disabled: true}),
      menu: new FormGroup({
        description: new FormControl({value: obj.menu.description, disabled: true}),
        name: new FormControl({value: obj.menu.name, disabled: true}),
        restaurant: new FormGroup({
          name: new FormControl({value: obj.menu.restaurant.name, disabled: true}),
        })
      })
    });
  }
  
}
