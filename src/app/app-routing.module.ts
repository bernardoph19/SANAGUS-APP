import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guard/auth-guard.guard';

const routes: Routes = [
  { path: '',   redirectTo: 'login',    pathMatch: 'full'  },  
  { path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule) },
  { path: 'tabs',  loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule) , canActivate : [ AuthGuardGuard ] },
  { path: 'filtrar-fecha', loadChildren: () => import('./filtrar-fecha/filtrar-fecha.module').then( m => m.FiltrarFechaPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
