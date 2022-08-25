import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

import { TokenStorageService, UserInfoService } from './services';
import { environment as e } from '../environments/environment.prod';
import { JwtResponse } from './models';
import { TranslateService } from '@ngx-translate/core';
import { EventBusService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  showMenu: boolean = false;
  loader: boolean = true;

  avatarImage!: string;
  infoUser: JwtResponse = {
    username: '',
    email: '',
    roles: [],
    token: '',
    type: '',
    id: 0,
    language: ''
  };

  eventBusSub?: Subscription;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private userInfoService: UserInfoService,
    public translate: TranslateService,
    private eventBusService: EventBusService
  ) { }

  ngOnInit(): void {
    this.userInfoService.showMenu.subscribe(show => {
      this.showMenu = show;
    });
    this.userInfoService.user.subscribe(u => {
      this.infoUser = u;
    });
    this.userInfoService.loader.subscribe(u => {
      this.loader = u;
    })
    if (!!this.tokenStorageService.getToken()) {
      const userInfo = this.tokenStorageService.getUser();
      if (userInfo.picByte != '') {
        this.avatarImage = 'data:image/jpeg;base64,' + userInfo.picByte;
      } else {
        this.avatarImage = e.IMAGE_DEFAULT;
      }
      this.infoUser.username = userInfo.username;
      this.infoUser.email = userInfo.email;
      this.infoUser.language = userInfo.language;

      this.userInfoService.setValueUser(this.infoUser);
    }

    const browserLang = this.translate.getBrowserLang();
    if(this.infoUser.language != undefined && this.infoUser.language != "") {
      this.translate.use(this.infoUser.language);
    } else if (browserLang != undefined){
      this.translate.use(browserLang.match(/pt-br|en/) ? browserLang : 'pt-br');
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.avatarImage = e.IMAGE_DEFAULT;
      this.logout();
    });
  }

  ngOnDestroy(): void {
    if (this.eventBusSub) {
      this.eventBusSub.unsubscribe();
    }
  }

  redirectComponent(component: string): void {
    switch (component) {
      case e.REDIRECT_DASHBOARD:
        this.router.navigate([e.REDIRECT_DASHBOARD]);
        this.sidenav.close();
        break;
      case e.REDIRECT_RESTAURANT:
        this.router.navigate([e.REDIRECT_RESTAURANT]);
        this.sidenav.close();
        break;
      case e.REDIRECT_MENU:
        this.router.navigate([e.REDIRECT_MENU]);
        this.sidenav.close();
        break;
      case e.REDIRECT_RESQUEST:
        this.router.navigate([e.REDIRECT_RESQUEST]);
        this.sidenav.close();
        break;
      case e.REDIRECT_USER_EDIT:
        this.router.navigate([e.REDIRECT_USER_EDIT]);
        this.sidenav.close();
        break;
      case e.REDIRECT_SHOPPING_CAR:
        this.router.navigate([e.REDIRECT_SHOPPING_CAR]);
        this.sidenav.close();
        break;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate([e.REDIRECT_AUTHENTICATION]);
    this.sidenav.close();
  }

}