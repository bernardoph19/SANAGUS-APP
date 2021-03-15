import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
/* import { FormsModule } from '@angular/forms'; */

import { IonicModule } from '@ionic/angular';

import { HistorialPageRoutingModule } from './historial-routing.module';
import { DemoMaterialModule } from '../material';

import { HistorialPage } from './historial.page';
import { CerrarsesionPage } from '../cerrarsesion/cerrarsesion.page';


@NgModule({
  imports: [
    CommonModule,
    /* FormsModule, */
    ReactiveFormsModule,
    IonicModule,
    HistorialPageRoutingModule,
    DemoMaterialModule,
    PipesModule
  ],
  declarations: [
    HistorialPage,
    CerrarsesionPage]
})
export class HistorialPageModule {}
