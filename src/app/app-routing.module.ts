import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './services';

import { 
  DashboardPainelOneComponent,
  LoginAuthenticationComponent,
  RestaurantCrudComponent,
  MenuListComponent,
  RequestListComponent,
  NotFoundComponent,
  UserEditComponent,
  DashboardPainelTwoComponent,
  ShoppingCarComponent
} from './components';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardPainelOneComponent, 
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
    //title: 'Dashboard'
  },
  { 
    path: 'dashboardAllMenu/:id', 
    component: DashboardPainelTwoComponent, 
    canLoad: [AuthGuard],
    canActivate: [AuthGuard] 
  },
  { 
    path: 'restaurant', 
    component: RestaurantCrudComponent, 
    canLoad: [AuthGuard],
    canActivate: [AuthGuard] 
  },
  { 
    path: 'menu', 
    component: MenuListComponent, 
    canLoad: [AuthGuard],
    canActivate: [AuthGuard] 
  },
  { 
    path: 'request', 
    component: RequestListComponent, 
    canLoad: [AuthGuard],
    canActivate: [AuthGuard] 
  },
  { 
    path: 'profile-edit', 
    component: UserEditComponent, 
    canLoad: [AuthGuard],
    canActivate: [AuthGuard] 
  },
  { 
    path: 'shopping-car', 
    component: ShoppingCarComponent, 
    canLoad: [AuthGuard],
    canActivate: [AuthGuard] 
  },
  { path: 'authentication', component: LoginAuthenticationComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
  { path: 'not-found', component: NotFoundComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
