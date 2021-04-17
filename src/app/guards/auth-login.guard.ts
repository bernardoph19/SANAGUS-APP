import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataLocalService } from '../services/data-local.service';

@Injectable({
  providedIn: 'root'
})
 export class AuthLoginGuard implements CanLoad {

  constructor( 
    private router           : Router,     
    private dataLocalService : DataLocalService 
  ){  }

  async canLoad () : Promise <boolean> {

    if (!environment.browser) {
        
      this.dataLocalService.getUserLogin().then((x : any) => {
        console.log(JSON.stringify(x));
        
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
      
      console.log('ELSE de BROWSER');      

      if( userlogeado && userlogeado !== null) {
        this.router.navigate(['/tabs/pendientes']);
        return true
        
      } else {
        return false;
      }
      
    }      

  }
}
