import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { EventData, Restaurant } from 'src/app/models';
import { RestaurantService, UserInfoService } from 'src/app/services';
import { EventBusService } from 'src/app/shared';
import { environment as e } from 'src/environments/environment.prod';

@Component({
  selector: 'app-dashboard-painel-one',
  templateUrl: './dashboard-painel-one.component.html',
  styleUrls: ['./dashboard-painel-one.component.css']
})
export class DashboardPainelOneComponent implements OnInit {

  displayedColumns: string[] = ['name'];
  dataSource!: MatTableDataSource<Restaurant>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  restaurants: Restaurant[] = [];
  isLoaderRestaurant: boolean = true;

  constructor(
    private restaurantService: RestaurantService,
    private eventBusService: EventBusService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private route: Router,
    private userInfo: UserInfoService
  ) { }

  ngOnInit(): void {
    this.getAllRestaurant();
  }

  getAllRestaurant(): void {
    this.restaurantService.getAllRestaurant().subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirectMenu(idRestaurant: number): void {
    this.route.navigate([`${e.REDIRECT_DASHBOARD_TWO}/${idRestaurant}`]);
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