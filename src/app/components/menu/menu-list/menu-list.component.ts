import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { MenuDialogRegisterComponent } from 'src/app/components/menu';
import { EventData, Menu, Restaurant } from 'src/app/models';
import { RestaurantService, TokenStorageService, MenuService, UserInfoService } from 'src/app/services';
import { DialogConfirmRemoveComponent, DialogImageComponent } from 'src/app/components/shared';
import { EventBusService } from 'src/app/shared';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'name', 'restaurant', 'options'];
  dataSource!: MatTableDataSource<Menu>;
  menus: Menu[] = [];
  restaurantByUser!: Restaurant[];

  restaurantSelect = new FormControl();
  options: Restaurant[] = [];
  filteredOptions!: Observable<Restaurant[]>;
  idUser!: number;
  isLoaderRestaurant: boolean = true;
  isLoaderMenu: boolean = true;

  constructor(
    public dialog: MatDialog,
    private token: TokenStorageService,
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private menuService: MenuService,
    private eventBusService: EventBusService,
    private userInfo: UserInfoService
  ) { }

  ngOnInit(): void {
    this.idUser = this.token.getIdUser();
    this.getRestaurantsByUser();
    this.getMenus(0, this.idUser);
  }

  configAutoCompleteInput(data: any): void {
    this.options = data;
    this.filteredOptions = this.restaurantSelect.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  callSearch(): void {
    let search = this.restaurantSelect.value;
    if(search != null && search.id != null) {
      this.getMenus(search.id, this.idUser);
    } else {
      this.menus = [];
    }
  }

  clearSearch(): void {
    this.restaurantSelect.setValue("");
    this.getMenus(0, this.idUser);
  }

  displayFn(restaurant: Restaurant): string {
    return restaurant && restaurant.name ? restaurant.name : '';
  }

  private _filter(name: string): Restaurant[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRestaurantsByUser(): void {
    this.restaurantService.getRestaurant(this.token.getIdUser()).subscribe({
      next: data => {
        this.restaurantByUser = data;
        this.configAutoCompleteInput(data);
        this.isLoaderRestaurant = false;
        this.verifyLoader();
      },
      error: err => {
        this.isLoaderRestaurant = true;
        this.functionBusService(err);
        this.snackBar.open(this.translate.instant('GLOBAL_WORD.WORD_MSG_SERVER_ERROR'), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
  }

  getMenus(idRestaurant: number, idUser: number): void {
    this.menuService.getMenu(idRestaurant, idUser).subscribe({
      next: data => { 
        if(data == null) {
          data = [];
        }
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.menus = data;
        this.isLoaderMenu = false;
        this.verifyLoader();
      },
      error: err => {
        this.isLoaderMenu = true;
        this.functionBusService(err);
        this.snackBar.open(this.translate.instant('GLOBAL_WORD.WORD_MSG_SERVER_ERROR'), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
  }

  openDialogRegister(type: number, object: any): void {
    const dialogRef = this.dialog.open(MenuDialogRegisterComponent, {
      width: '500px',
      height: '270px',
      data: {
        'menu': object,
        'restaurant': this.restaurantByUser
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {

        switch (type) {
          case 1:
            this.saveMenu(result);
            break;
          case 2:
            this.updateMenu(result);
            break;
        }
      }
    });
  }

  openDialogRemove(menu: Menu): void {
    const dialogRef = this.dialog.open(DialogConfirmRemoveComponent, {
      width: '300px',
      height: '180px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.removeMenu(menu);
      }
    });
  }

  openDialogImage(menu: Menu): void {
    const dialogImage = this.dialog.open(DialogImageComponent, {
      width: '500px',
      height: '400px',
      data: {
        'image': menu.picByte,
      }
    });

    dialogImage.afterClosed().subscribe(result => {
      if(result != null) {
        result.append('menu', new Blob([
          JSON.stringify(menu)
        ], {
          type: 'application/json'
        }));
        this.saveImageMenu(result);
      }
    });
  }

  saveMenu(menu: Menu): void {
    this.menuService.saveMenu(menu).subscribe({
      next: data => {
        this.verifySearchScreen();
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

  updateMenu(menu: Menu): void {
    this.menuService.updateMenu(menu).subscribe({
      next: data => {
        this.verifySearchScreen();
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

  saveImageMenu(image: any): void {
    this.menuService.saveMenuImage(image).subscribe({
      next: data => {
        this.verifySearchScreen();
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

  removeMenu(menu: Menu): void {
    this.menuService.removeMenu(menu.idMenu, this.idUser, menu.restaurant.id).subscribe({
      next: data => {
        this.verifySearchScreen();
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

  verifySearchScreen(): void {
    if(this.restaurantSelect.value == "" || this.restaurantSelect.value == null) {
      this.getMenus(0, this.idUser);
    } else {
      let search = this.restaurantSelect.value;
      this.getMenus(search.id, this.idUser);
    }
  }

  private functionBusService(err: any): void {
    if (err.status === 403) {
      this.eventBusService.emit(new EventData('logout', null));
    }
  }

  private verifyLoader(): void {
    if(!this.isLoaderRestaurant && !this.isLoaderMenu) {
      this.userInfo.loader.emit(false);
    } else {
      this.userInfo.loader.emit(true);
    }
  }

}
