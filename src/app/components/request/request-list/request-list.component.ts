import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { TokenStorageService, UserInfoService } from 'src/app/services';
import { EventBusService } from 'src/app/shared';
import { EventData } from 'src/app/models';
import { RequestService } from 'src/app/services/request/request.service';
import { RequestDialogDetailComponent } from 'src/app/components/request';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['nameMenu', 'amount', 'options'];
  dataSource!: MatTableDataSource<Request>;
  requests: Request[] = [];

  idUserLogged!: number;
  isLoaderRequest: boolean = true;
  
  constructor(
    private userInfo: UserInfoService,
    private eventBusService: EventBusService,
    private tokenStorageService: TokenStorageService,
    private requestService: RequestService,
    private translate: TranslateService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.idUserLogged = this.tokenStorageService.getIdUser();
    this.getRequestByUser();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRequestByUser(): void {
    this.requestService.getRequestByUser(this.idUserLogged).subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if(data == null) {
          this.requests = [];
        } else {
          this.requests = data;
        }
        this.isLoaderRequest = false;
        this.verifyLoader();
      },
      error: err => {
        this.isLoaderRequest = true;
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

  openDialogRequestDetail(obj: Request): void {
    this.dialog.open(RequestDialogDetailComponent, {
      width: '500px',
      height: '350px',
      data: obj
    });
  }

  private functionBusService(err: any): void {
    if (err.status === 403) {
      this.eventBusService.emit(new EventData('logout', null));
    }
  }

  private verifyLoader(): void {
    if(!this.isLoaderRequest) {
      this.userInfo.loader.emit(false);
    } else {
      this.userInfo.loader.emit(true);
    }
  }

}
