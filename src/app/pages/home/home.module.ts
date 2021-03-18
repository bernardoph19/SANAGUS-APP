import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { DemoMaterialModule } from 'src/app/material';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { CerrarsesionPageModule } from 'src/app/componentes/cerrarsesion/cerrarsesion.module';
import { LoadingPageModule } from 'src/app/componentes/loading/loading.module';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    DemoMaterialModule,
    PipesModule,
    CerrarsesionPageModule,
    LoadingPageModule
  ],
  declarations: [
    HomePage,    
  ]
})
export class HomePageModule {}
