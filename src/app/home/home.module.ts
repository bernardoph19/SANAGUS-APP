import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { DemoMaterialModule } from '../material';
import { PipesModule } from '../pipes/pipes.module';
import { CerrarsesionPage } from '../cerrarsesion/cerrarsesion.page';
import { LoadingPage } from '../loading/loading.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    DemoMaterialModule,
    PipesModule
  ],
  declarations: [
    HomePage,
    CerrarsesionPage,
    LoadingPage
  ]
})
export class HomePageModule {}
