
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
/* import { AuthGuardGuard } from '../guard/auth-guard.guard'; */
import { TabsPage } from './tabs.page';


const routes: Routes = [

  { path: '',   redirectTo:'pendientes', canActivate : [ AuthGuardService ] },

  { path: '', 
    component: TabsPage,

    children:[

        {path: 'pendientes', loadChildren: () => import('../home/home.module').then(m => m.HomePageModule), canActivate : [ AuthGuardService ]},
        {path: 'historial', loadChildren:() => import ('../historial/historial.module').then(m => m.HistorialPageModule), canActivate : [ AuthGuardService ] },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
