import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataLocalService } from '../services/data-local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( 
    private router : Router, 
    private  platform : Platform,
    private dataLocalService : DataLocalService 
  ){  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      /* const userlogeado = JSON.parse(localStorage.getItem('userLogueado'));

      if( userlogeado && userlogeado !== null) {
        this.router.navigate(['/tabs/pendientes']);
        return true
        
      } else {
        return false;
      } */
      debugger;
      //if (this.platform.is('android') || this.platform.is('ios')) {
      if (!environment.browser) {
        
        this.dataLocalService.getUserLogin().then((x : any) => {
          console.log('desde el GUARD putos todos xd');
          console.log(JSON.parse(x));
          if(x) {
            console.log('dentro de if existe X');
            this.router.navigate(['/tabs/pendientes']);
            return true;
          } else {
            return false;
          }
        });

      
      } else {

        const userlogeado = JSON.parse(localStorage.getItem('userLogueado'));
        
        console.log(userlogeado);
        debugger;

        if( userlogeado && userlogeado !== null) {
          this.router.navigate(['/tabs/pendientes']);
          return true
          
        } else {
          return false;
        }
        
      }      
  }
  
}
