import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthPageRoutingModule } from './auth-routing.module';

import { AuthPage } from './auth.page';
import { LoginPageModule } from './login/login.module';
import { RegisterPageModule } from './register/register.module';
import { RecoverPageModule } from './recover/recover.module';

@NgModule({
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
