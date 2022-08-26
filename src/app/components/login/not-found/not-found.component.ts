import { Component, OnInit } from '@angular/core';

import { UserInfoService } from 'src/app/services';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private userInfo: UserInfoService
  ) {
    this.verifyLoader();
   }

  ngOnInit(): void {
  }

  private verifyLoader(): void {
    this.userInfo.loader.emit(false);
  }

}
