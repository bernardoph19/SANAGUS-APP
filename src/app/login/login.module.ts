import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import { LoadingPage } from '../loading/loading.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    //FormsModule,
    IonicModule,
    LoginPageRoutingModule    
  ],
  declarations: [
    LoginPage,
    LoadingPage
  ]
})
export class LoginPageModule {}
