import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { AuthLoginGuard } from './guards/auth-login.guard';
//import { AuthGuard } from './guards/auth.guard';
// canActivate: [ AuthGuard ]  canLoad: [AuthGuard]
const routes: Routes = [
  { path: '',              redirectTo: 'login',    pathMatch: 'full'  },
  { path: 'login',         loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),  },
  { path: 'tabs',          loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule) },
  { path: 'filtrar-fecha', loadChildren: () => import('./componentes/filtrar-fecha/filtrar-fecha.module').then( m => m.FiltrarFechaPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

