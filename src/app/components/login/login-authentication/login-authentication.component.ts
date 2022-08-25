import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { JwtResponse, LoginRequest, SignupRequest } from 'src/app/models';
import { LoginCreateComponent } from 'src/app/components/login';
import { AuthService, TokenStorageService, UserInfoService } from 'src/app/services';
import { environment as e } from 'src/environments/environment.prod';
import { MyErrorStateMatcher } from 'src/app/shared';

@Component({
  selector: 'app-login-authentication',
  templateUrl: './login-authentication.component.html',
  styleUrls: ['./login-authentication.component.css']
})
export class LoginAuthenticationComponent implements OnInit {

  loginForm!: FormGroup;
  matcher = new MyErrorStateMatcher();

  loginUser!: LoginRequest;
  errorMessage = '';
  userInfo!: JwtResponse;
  isLoader: boolean = true;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private snackBar: MatSnackBar,
    private userInfoService: UserInfoService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoader = false;
      this.verifyLoader()
      this.loginForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      });
      if (this.tokenStorage.getToken()) {
        this.userInfoService.alterValue(true);
        this.userInfo = this.tokenStorage.getUser();
        this.userInfoService.setValueUser(this.userInfo);
      }
    }, 1000);
  }

  onSubmit(): void {
    this.loginUser = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    }

    this.authService.login(this.loginUser).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveRefreshToken(data.refreshToken);
        this.tokenStorage.saveUser(data);

        this.isLoader = true;
        this.verifyLoader();
        this.router.navigate([e.REDIRECT_DASHBOARD]);
        this.userInfo = data;
        this.userInfoService.alterValue(true);
        this.userInfoService.setValueUser(this.userInfo);

        this.translate.use(data.language);
      },
      error: err => {
        this.resetForm();
        this.errorMessage = err.message;
        this.userInfoService.alterValue(false);
        this.snackBar.open('Login ou senha inválido', '', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
  }

  openDialogCreateUser(): void {
    this.resetForm();

    const dialogRef = this.dialog.open(LoginCreateComponent, {
      width: '500px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.createUser(result);
      }
    });
  }

  createUser(u: SignupRequest): void {
    this.authService.register(u).subscribe({
      next: data => {
        this.snackBar.open(this.translate.instant(data.message), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      },
      error: err => {
        this.snackBar.open(this.translate.instant(err.error.message), 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 10000
        });
      }
    });
  }

  resetForm(): void {
    this.loginForm.reset();

    for (const key in this.loginForm.controls) {
      this.loginForm.controls[key].clearValidators();
      this.loginForm.controls[key].updateValueAndValidity();
    }
  }

  private verifyLoader(): void {
    if (!this.isLoader) {
      this.userInfoService.loader.emit(false);
    } else {
      this.userInfoService.loader.emit(true);
    }

  }

}