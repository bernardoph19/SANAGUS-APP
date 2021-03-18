import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltrarFechaPage } from './filtrar-fecha.page';

const routes: Routes = [
  {
    path: '',
    component: FiltrarFechaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltrarFechaPageRoutingModule {}
