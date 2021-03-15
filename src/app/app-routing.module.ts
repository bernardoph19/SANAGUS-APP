import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
/* import { AuthGuardService } from './services/auth-guard.service'; */

const routes: Routes = [
  { path: '',   redirectTo: 'login',    pathMatch: 'full'  },  
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) },
  { path: 'tabs',  loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)/* ,  canActivate : [ AuthGuardService ]  */},
  { path: 'filtrar-fecha', loadChildren: () => import('./filtrar-fecha/filtrar-fecha.module').then( m => m.FiltrarFechaPageModule) },
  {
    path: 'cerrarsesion',
    loadChildren: () => import('./cerrarsesion/cerrarsesion.module').then( m => m.CerrarsesionPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then( m => m.LoadingPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

