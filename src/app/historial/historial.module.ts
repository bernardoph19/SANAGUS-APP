import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialPageRoutingModule } from './historial-routing.module';
import { DemoMaterialModule } from '../material';

import { HistorialPage } from './historial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialPageRoutingModule,
    DemoMaterialModule
  ],
  declarations: [HistorialPage]
})
export class HistorialPageModule {}
