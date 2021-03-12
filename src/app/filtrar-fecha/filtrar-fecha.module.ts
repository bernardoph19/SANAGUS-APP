import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* import { FormsModule } from '@angular/forms'; */
import { ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { FiltrarFechaPageRoutingModule } from './filtrar-fecha-routing.module';

import { FiltrarFechaPage } from './filtrar-fecha.page';
import { DemoMaterialModule } from '../material';

@NgModule({
  imports: [
    CommonModule,
    /* FormsModule, */
    ReactiveFormsModule,
    IonicModule,
    FiltrarFechaPageRoutingModule,
    DemoMaterialModule
  ],
  declarations: [FiltrarFechaPage]
})
export class FiltrarFechaPageModule {}
