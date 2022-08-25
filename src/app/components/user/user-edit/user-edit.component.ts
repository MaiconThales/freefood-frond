import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

import { Address, User } from 'src/app/models';
import { AddressService, TokenStorageService, UserInfoService, UserService } from 'src/app/services';
import { EventData } from 'src/app/models';
import { environment as e } from 'src/environments/environment.prod';
import { EventBusService, MyErrorStateMatcher } from 'src/app/shared';
import { AddressUserComponent } from 'src/app/components/user';
import { DialogImageComponent } from 'src/app/components/shared';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userEditForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  user!: User;
  address!: Address[];
  language: string[] = e.LANGUAGE_OPTIONS;
  idUser!: number;
  isLoaderDataUser: boolean = true;
  isLoaderAddress: boolean = true;

  constructor(
    private userService: UserService,
    private token: TokenStorageService,
    private snackBar: MatSnackBar,
    private eventBusService: EventBusService,
    private translate: TranslateService,
    public dialog: MatDialog,
    private addressService: AddressService,
    private userInfo: UserInfoService
  ) { }

  ngOnInit(): void {
    this.idUser = this.token.getIdUser();
    this.createFormUser(undefined, 1);
    this.getDataUser();
    this.getAddressByUser();
  }

  getDataUser() {
    this.userService.getDataUser(this.idUser).subscribe({
      next: data => {
        this.user = data;
        this.createFormUser(data, 2);
        this.isLoaderDataUser = false;
        this.verifyLoader();
      },
      error: err => {
        this.isLoaderDataUser = true;
        this.functionBusService(err);
        this.snackBar.open(this.translate.instant('GLOBAL_WORD.WORD_MSG_SERVER_ERROR'), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
  }

  createFormUser(user: any, type: number): void {
    switch (type) {
      case 1:
        this.userEditForm = new FormGroup({
          id: new FormControl(''),
          username: new FormControl('', [Validators.required]),
          password: new FormControl(''),
          email: new FormControl('', [Validators.required, Validators.email]),
          language: new FormControl('', [Validators.required]),
          phone: new FormControl(''),
          name: new FormControl('')
        });
        break;
      case 2:
        this.userEditForm = new FormGroup({
          id: new FormControl(user.id),
          username: new FormControl(user.username, [Validators.required]),
          password: new FormControl(user.password),
          email: new FormControl(user.email, [Validators.required, Validators.email]),
          language: new FormControl(user.language, [Validators.required]),
          phone: new FormControl(user.phone),
          name: new FormControl(user.name)
        });
        break;
    }
  }

  onSubmit(): void {
    this.user = {
      id: this.userEditForm.get('id')?.value,
      username: this.userEditForm.get('username')?.value,
      password: this.userEditForm.get('password')?.value,
      email: this.userEditForm.get('email')?.value,
      language: this.userEditForm.get('language')?.value,
      name: this.userEditForm.get('name')?.value,
      phone: this.userEditForm.get('phone')?.value,
      roles: []
    };
    if (this.user != null) {
      this.userService.alterDataUser(this.user).subscribe({
        next: () => {
          this.snackBar.open(this.translate.instant('GLOBAL_WORD.WORD_MSG_ALTER_SUCCESS'), 'Ok', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 10000
          });
          setTimeout(() => {
            let user = this.token.getUser();
            user.language = this.user.language;
            this.token.saveUser(user);
            window.location.reload();
          }, 1000);
        },
        error: err => {
          this.functionBusService(err);
          this.snackBar.open(this.translate.instant('GLOBAL_WORD.WORD_MSG_SERVER_ERROR'), 'Ok', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 10000
          });
        }
      });
    }
  }

  openDialogAddress(address: Address | null): void {
    const dialogRef = this.dialog.open(AddressUserComponent, {
      width: '500px',
      height: '280px',
      data: address
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(address == null) {
          this.saveAddress(result);
        } else {
          this.updateAddress(result);
        }
      }
    });
  }

  openDialogImage(): void {
    const dialogImage = this.dialog.open(DialogImageComponent, {
      width: '500px',
      height: '400px',
      data: {
        'image': this.user.picByte,
      }
    });

    dialogImage.afterClosed().subscribe(result => {
      if(result != null) {
        this.isLoaderDataUser = true;
        result.append('user', new Blob([
          JSON.stringify(this.user)
        ], {
          type: 'application/json'
        }));
        this.saveImage(result);
      }
    });
  }

  getAddressByUser(): void {
    this.addressService.getAddressByUser(this.idUser).subscribe({
      next: data => {
        this.address = data;
        this.isLoaderAddress = false;
        this.verifyLoader();
      },
      error: err => {
        this.isLoaderAddress = true;
        this.functionBusService(err);
        this.snackBar.open(this.translate.instant('GLOBAL_WORD.WORD_MSG_SERVER_ERROR'), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
  }

  saveAddress(address: Address): void {
    this.addressService.saveAddress(address).subscribe({
      next: data => {
        this.getAddressByUser();
        this.snackBar.open(this.translate.instant(data.message), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      },
      error: err => {
        this.functionBusService(err);
          this.snackBar.open(this.translate.instant('GLOBAL_WORD.WORD_MSG_SERVER_ERROR'), 'Ok', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 10000
          });
      }
    });
  }

  saveImage(image: any): void {
    this.userService.saveMenuUser(image).subscribe({
      next: data => {
        this.getDataUser();
        this.snackBar.open(this.translate.instant(data.message), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      },
      error: err => {
        this.functionBusService(err);
        this.snackBar.open(this.translate.instant(err.message), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
  }

  updateAddress(address: Address): void {
    this.addressService.updateAddress(address).subscribe({
      next: data => {
        this.getAddressByUser();
        this.snackBar.open(this.translate.instant(data.message), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      },
      error: err => {
        this.functionBusService(err);
          this.snackBar.open(this.translate.instant('GLOBAL_WORD.WORD_MSG_SERVER_ERROR'), 'Ok', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 10000
          });
      }
    });
  }

  deleteAddress(idAddress: number): void {
    this.addressService.deleteAddress(idAddress).subscribe({
      next: data => {
        this.getAddressByUser();
        this.snackBar.open(this.translate.instant(data.message), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      },
      error: err => {
        this.functionBusService(err);
        this.snackBar.open(this.translate.instant('GLOBAL_WORD.WORD_MSG_SERVER_ERROR'), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
  }

  private functionBusService(err: any): void {
    if (err.status === 403) {
      this.eventBusService.emit(new EventData('logout', null));
    }
  }

  private verifyLoader(): void {
    if(!this.isLoaderDataUser && !this.isLoaderAddress) {
      this.userInfo.loader.emit(false);
    } else {
      this.userInfo.loader.emit(true);
    }
  }

}
