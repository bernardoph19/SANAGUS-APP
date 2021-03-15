import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CerrarsesionPageRoutingModule } from './cerrarsesion-routing.module';

import { CerrarsesionPage } from './cerrarsesion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CerrarsesionPageRoutingModule
  ],
  declarations: [CerrarsesionPage]
})
export class CerrarsesionPageModule {}
