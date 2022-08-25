import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Address, EventData, Menu, Request } from 'src/app/models';
import { AddressService, ShoppingCarService, TokenStorageService, UserInfoService } from 'src/app/services';
import { EventBusService, MyErrorStateMatcher } from 'src/app/shared';
import { AddressSelectDialogComponent } from 'src/app/components'
import { RequestService } from 'src/app/services/request/request.service';
import { Router } from '@angular/router';
import { environment as e } from 'src/environments/environment.prod';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css']
})
export class ShoppingCarComponent implements OnInit {

  idUserLogged!: number;
  menusSelect: Menu[] = [];
  address!: Address[];
  addressSelect!: Address;
  requestUser!: Request[];
  isLoaderAddress: boolean = true;

  generalForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private shoppingCarService: ShoppingCarService,
    private token: TokenStorageService,
    private addressService: AddressService,
    private eventBusService: EventBusService,
    private translate: TranslateService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private requestService: RequestService,
    private route: Router,
    private userInfo: UserInfoService
  ) { }

  ngOnInit(): void {
    this.idUserLogged = this.token.getIdUser();
    this.createForm();
    this.getShoppingCar();
    this.getAddressByUser();
  }

  getShoppingCar(): void {
    this.menusSelect = this.shoppingCarService.getShoppingCar();
    this.menusSelect.forEach((m) => {
      this.addRequest(m);
    });
  }

  removeItemShoppingCar(index: number): void {
    let idMenuRemove = (<FormArray>this.generalForm.get('request')).controls[index].get('menu')?.get('idMenu')?.value
    this.shoppingCarService.removeMenuInShoppingCar(idMenuRemove);
    this.removeRequest(index);
    this.createForm();
    this.getShoppingCar();
  }

  getAddressByUser(): void {
    this.addressService.getAddressByUser(this.idUserLogged).subscribe({
      next: data => {
        if(data != null) {
          data.forEach((d: Address) => {
            if(d.isDefault) {
              this.addressSelect = d;
            }
          });
          this.address = data;
        }
        this.isLoaderAddress = false;
        this.verifyLoader();
      },
      error: err => {
        this.isLoaderAddress = true;
        this.verifyLoader();
        this.functionBusService(err);
        this.snackBar.open(this.translate.instant('GLOBAL_WORD.WORD_MSG_SERVER_ERROR'), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
  }

  openDialogSelectAddress(): void {
    const dialogRef = this.dialog.open(AddressSelectDialogComponent, {
      width: '500px',
      height: '280px',
      data: {
        address: this.address,
        addressSelect: this.addressSelect
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addressSelect = result;
      }
    });
  }

  private functionBusService(err: any): void {
    if (err.status === 403) {
      this.eventBusService.emit(new EventData('logout', null));
    }
  }

  createForm(): void {
    this.generalForm = this.fb.group({
      request: this.fb.array([])
    });
  }
  get request(): FormArray {
    return this.generalForm.get("request") as FormArray
  }
  newRequest(menu: Menu): FormGroup {
    return this.fb.group({
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
      observation: new FormControl(''),
      menu: new FormGroup({
        idMenu: new FormControl(menu.idMenu),
        restaurant: new FormControl(menu.restaurant),
        name: new FormControl({value: menu.name, disabled: true}),
        description: new FormControl({value: menu.description, disabled: true})
      })
    })
  }
  addRequest(menu: Menu) {
    this.request.push(this.newRequest(menu));
  }
  removeRequest(i: number) {
    this.request.removeAt(i);
  }
  onSubmit() {
    this.requestUser = [];
    let index = (<FormArray>this.generalForm.get('request')).length;
    for (let i = 0; i < index; i++) {
      let objRequest: Request = {
        amount: (<FormArray>this.generalForm.get('request')).controls[i].get('amount')?.value,
        observation: (<FormArray>this.generalForm.get('request')).controls[i].get('observation')?.value,
        menu: {
          idMenu: (<FormArray>this.generalForm.get('request')).controls[i].get('menu')?.get('idMenu')?.value,
          name: (<FormArray>this.generalForm.get('request')).controls[i].get('menu')?.get('name')?.value,
          description: (<FormArray>this.generalForm.get('request')).controls[i].get('menu')?.get('description')?.value,
          restaurant: (<FormArray>this.generalForm.get('request')).controls[i].get('menu')?.get('restaurant')?.value,
        },
        address: this.addressSelect
      }
      this.requestUser.push(objRequest);
    }

    this.requestService.saveRequest(this.requestUser).subscribe({
      next: data => {
        this.route.navigate([e.REDIRECT_DASHBOARD]);
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

  private verifyLoader(): void {
    if(!this.isLoaderAddress) {
      this.userInfo.loader.emit(false);
    } else {
      this.userInfo.loader.emit(true);
    }
  }

}
