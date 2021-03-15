
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from '../guard/auth-guard.guard';
import { TabsPage } from './tabs.page';


const routes: Routes = [

  { path: '',   redirectTo:'pendientes', canActivate : [ AuthGuardGuard ] },

  { path: '', 
    component: TabsPage,

    children:[

        {path: 'pendientes', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule), canActivate : [ AuthGuardGuard ]},
        {path: 'historial', loadChildren:() => import ('../historial/historial.module').then(m => m.HistorialPageModule), canActivate : [ AuthGuardGuard ] },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
