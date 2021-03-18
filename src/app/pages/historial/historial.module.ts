import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DemoMaterialModule } from '../../material';

import { PipesModule } from '../../pipes/pipes.module';
import { CerrarsesionPageModule } from 'src/app/componentes/cerrarsesion/cerrarsesion.module';

import { HistorialPage } from './historial.page';
import { HistorialPageRoutingModule } from './historial-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    HistorialPageRoutingModule,
    DemoMaterialModule,
    PipesModule,
    CerrarsesionPageModule
  ],
  declarations: [
    HistorialPage,
  ]
})
export class HistorialPageModule {}
