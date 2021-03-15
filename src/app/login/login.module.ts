import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { AuthGuardGuard } from '../guard/auth-guard.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    //FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    AuthGuardGuard
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
