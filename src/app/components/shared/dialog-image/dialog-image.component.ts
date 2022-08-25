import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-image',
  templateUrl: './dialog-image.component.html',
  styleUrls: ['./dialog-image.component.css']
})
export class DialogImageComponent {

  noHaveImage: boolean = true;
  imageForm!: FormGroup;
  selectedFile!: File;
  filaName = "";
  imageURL!: string;

  constructor(
    public dialogRef: MatDialogRef<DialogImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {
    if (data.image != null) {
      this.imageURL = 'data:image/jpeg;base64,' + data.image;
    } else {
      this.imageURL = 'assets/img/avatar/no_have_image.jpg';
    }
    this.createForm();
  }

  createForm(): void {
    this.imageForm = new FormGroup({
      image: new FormControl('')
    });
  }

  //Gets called when the user selects an image
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.filaName = this.selectedFile.name;

    if (this.selectedFile.type == 'image/png' || this.selectedFile.type == 'image/jpeg') {
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.snackBar.open(this.translate.instant('GLOBAL_WORD.FORMAT_INVALID'), 'Ok', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 10000
      });
    }
  }

  onSubmit(): void {
    let image = new FormData();
    image.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.dialogRef.close(image);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
