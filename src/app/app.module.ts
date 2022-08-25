import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from "@auth0/angular-jwt";
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';

import {
  DashboardPainelOneComponent,
  LoginAuthenticationComponent,
  LoginCreateComponent,
  RestaurantCrudComponent,
  RequestListComponent,
  MenuListComponent,
  NotFoundComponent,
  UserEditComponent,
  RestaurantLiberateComponent,
  DashboardPainelTwoComponent,
  AddressUserComponent,
  ShoppingCarComponent,
  SkeletonComponent,
  RestaurantDialogComponent,
  MenuDialogRegisterComponent,
  DialogConfirmRemoveComponent,
  DashboardDialogDetailMenuComponent,
  AddressSelectDialogComponent,
  RequestDialogDetailComponent
} from './components';

import { authInterceptorProviders, PaginatorI18n } from './shared';
import { AuthGuardService, AuthService } from './services';
import { DialogImageComponent } from './components/shared/dialog-image/dialog-image.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardPainelOneComponent,
    LoginAuthenticationComponent,
    LoginCreateComponent,
    RestaurantCrudComponent,
    RequestListComponent,
    MenuListComponent,
    NotFoundComponent,
    UserEditComponent,
    RestaurantDialogComponent,
    RestaurantLiberateComponent,
    MenuDialogRegisterComponent,
    DialogConfirmRemoveComponent,
    DashboardPainelTwoComponent,
    AddressUserComponent,
    DashboardDialogDetailMenuComponent,
    ShoppingCarComponent,
    AddressSelectDialogComponent,
    SkeletonComponent,
    RequestListComponent,
    RequestDialogDetailComponent,
    DialogImageComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
      isolate: true,
      defaultLanguage: 'en'
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: [""],
      },
    }),
    NgxMaskModule.forRoot(maskConfig),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxSkeletonLoaderModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatStepperModule,
    MatListModule,
    MatRadioModule
  ],
  providers: [
    authInterceptorProviders,
    AuthGuardService,
    AuthService,
    {
      provide: MatPaginatorIntl, deps: [TranslateService],
      useFactory: (translateService: TranslateService) => new PaginatorI18n(translateService).getPaginatorIntl()
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }