import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-confirm-remove',
  templateUrl: './dialog-confirm-remove.component.html',
  styleUrls: ['./dialog-confirm-remove.component.css']
})
export class DialogConfirmRemoveComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmRemoveComponent>
  ) { }

  removeAction(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
