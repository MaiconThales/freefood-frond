import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { RestaurantDialogComponent, RestaurantLiberateComponent } from 'src/app/components/restaurant';
import { RestaurantService, TokenStorageService, UserInfoService } from 'src/app/services';
import { EventData, Restaurant } from 'src/app/models';
import { DialogConfirmRemoveComponent } from 'src/app/components/shared';
import { EventBusService } from 'src/app/shared';

@Component({
  selector: 'app-restaurant-crud',
  templateUrl: './restaurant-crud.component.html',
  styleUrls: ['./restaurant-crud.component.css']
})
export class RestaurantCrudComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'name', 'address', 'options'];
  dataSource!: MatTableDataSource<Restaurant>;
  restaurants: Restaurant[] = [];
  isLoaderRestaurant: boolean = true;

  constructor(
    public dialog: MatDialog,
    private restaurantService: RestaurantService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private token: TokenStorageService,
    private eventBusService: EventBusService,
    private userInfo: UserInfoService
  ) { }

  ngOnInit(): void {
    this.getRestaurant();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRestaurant(): void {
    this.restaurantService.getRestaurant(this.token.getIdUser()).subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.restaurants = data;
        this.isLoaderRestaurant = false;
        this.verifyLoader();
      },
      error: err => {
        this.isLoaderRestaurant = true;
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

  openDialogCreateRestaurant(type: number, object: any): void {
    const dialogRef = this.dialog.open(RestaurantDialogComponent, {
      width: '500px',
      height: '180px',
      data: object
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        switch (type) {
          case 1:
            this.saveRestaurant(result);
            break;
          case 2:
            this.updateRestaurant(result);
            break;
        }
      }
    });
  }

  openDialogLiberateRestaurant(restaurant: Restaurant): void {
    const dialogRef = this.dialog.open(RestaurantLiberateComponent, {
      width: '500px',
      height: '180px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.liberateRestaurant(restaurant, result);
      }
    });
  }

  openDialogRemove(restaurant: Restaurant): void {
    const dialogRef = this.dialog.open(DialogConfirmRemoveComponent, {
      width: '300px',
      height: '170px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.removeRestaurant(restaurant);
      }
    });
  }

  saveRestaurant(restaurant: Restaurant): void {
    this.restaurantService.saveRestaurant(restaurant).subscribe({
      next: () => {
        this.getRestaurant();
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

  updateRestaurant(restaurant: Restaurant): void {
    this.restaurantService.updateRestaurant(restaurant, this.token.getIdUser()).subscribe({
      next: () => {
        this.snackBar.open(this.translate.instant('GLOBAL_WORD.MSG_EDIT'), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
        this.getRestaurant();
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

  liberateRestaurant(restaurant: Restaurant, username: String): void {
    this.restaurantService.liberateRestaurant(restaurant, this.token.getIdUser(), username). subscribe({
      next: data => {
        this.snackBar.open(this.translate.instant(data.message), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      },
      error: err => {
        this.functionBusService(err);
        this.snackBar.open(this.translate.instant(err.error.message), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
  }

  removeRestaurant(restaurant: Restaurant): void {
    if(restaurant.id != null) {
      this.restaurantService.removeRestaurant(restaurant.id, this.token.getIdUser()).subscribe({
        next: () => {
          this.snackBar.open(this.translate.instant('GLOBAL_WORD.MSG_REMOVE'), 'Ok', {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 10000
          });
          this.getRestaurant();
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

  private functionBusService(err: any): void {
    if (err.status === 403) {
      this.eventBusService.emit(new EventData('logout', null));
    }
  }

  private verifyLoader(): void {
    if(!this.isLoaderRestaurant) {
      this.userInfo.loader.emit(false);
    } else {
      this.userInfo.loader.emit(true);
    }
  }

}
