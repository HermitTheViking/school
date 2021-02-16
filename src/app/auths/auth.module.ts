import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { LoginPageModule } from './login/login.module';
import { RegisterPageModule } from './register/register.module';
import { RecoverPageModule } from './recover/recover.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { authInterceptorProviders } from 'src/app/shared/interceptors/auth';

@NgModule({
  providers: [
    AuthService,
    TokenStorageService,
    authInterceptorProviders,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AuthPageRoutingModule,
    LoginPageModule,
    RegisterPageModule,
    RecoverPageModule
  ],
  declarations: [AuthPage]
})
export class AuthPageModule { }
