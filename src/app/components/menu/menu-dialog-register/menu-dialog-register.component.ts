import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Menu, Restaurant } from 'src/app/models';
import { MyErrorStateMatcher } from 'src/app/shared';

@Component({
  selector: 'app-menu-dialog-register',
  templateUrl: './menu-dialog-register.component.html',
  styleUrls: ['./menu-dialog-register.component.css']
})
export class MenuDialogRegisterComponent {

  menuForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  isCreate: boolean = true;

  options: Restaurant[] = [];
  filteredOptions!: Observable<Restaurant[]>;

  constructor(
    public dialogRef: MatDialogRef<MenuDialogRegisterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    if(data.menu == null) {
      this.isCreate = true;
    } else {
      this.isCreate = false;
    }
    this.createForm();
    this.configAutoCompleteInput(data)
  }

  configAutoCompleteInput(data: any): void {
    this.options = data.restaurant;
    this.filteredOptions = this.menuForm.controls['restaurant'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  displayFn(restaurant: Restaurant): string {
    return restaurant && restaurant.name ? restaurant.name : '';
  }

  private _filter(name: string): Restaurant[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  createForm(): void {
    if(this.isCreate) {
      this.menuForm = new FormGroup({
        idMenu: new FormControl(''),
        name: new FormControl('', [Validators.required]),
        restaurant: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      });
    } else {
      this.menuForm = new FormGroup({
        idMenu: new FormControl(this.data.menu.idMenu),
        name: new FormControl(this.data.menu.name, [Validators.required]),
        restaurant: new FormControl(this.data.menu.restaurant, [Validators.required]),
        description: new FormControl(this.data.menu.description, [Validators.required])
      });
    }
  }

  onSubmit(): void {
    let menu: Menu;
    if(this.isCreate) {
      menu = {
        name: this.menuForm.get('name')?.value,
        restaurant: this.menuForm.get('restaurant')?.value,
        description: this.menuForm.get('description')?.value
      }
    } else {
      menu = {
        idMenu: this.menuForm.get('idMenu')?.value,
        name: this.menuForm.get('name')?.value,
        restaurant: this.menuForm.get('restaurant')?.value,
        description: this.menuForm.get('description')?.value
      }
    }
    
    this.dialogRef.close(menu);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
