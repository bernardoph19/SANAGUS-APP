import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { AuthGuardService } from '../services/auth-guard.service';
/* import { AuthGuardGuard } from '../guard/auth-guard.guard'; */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    AuthGuardService
    /* AuthGuardGuard */

  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
