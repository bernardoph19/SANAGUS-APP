
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DemoMaterialModule } from 'src/app/material';

import { LoadingPageModule } from 'src/app/componentes/loading/loading.module';

import { FiltrarFechaPageRoutingModule } from './filtrar-fecha-routing.module';
import { FiltrarFechaPage } from './filtrar-fecha.page';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FiltrarFechaPageRoutingModule,
    DemoMaterialModule,
    LoadingPageModule
  ],
  declarations: [
    FiltrarFechaPage,
  ],
  /* exports: [
    FiltrarFechaPage
  ] */
})
export class FiltrarFechaPageModule {}
