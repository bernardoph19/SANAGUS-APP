
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';


const routes: Routes = [

{path: '',   redirectTo:'pendientes',},

{ path: '', component: TabsPage,

    children:[

      {path: 'pendientes', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)},

      {path: 'historial', loadChildren:() => import ('../historial/historial.module').then(m => m.HistorialPageModule)},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
