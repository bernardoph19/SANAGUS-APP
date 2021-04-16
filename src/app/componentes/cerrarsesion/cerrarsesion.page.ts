
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-cerrarsesion',
  templateUrl: './cerrarsesion.page.html',
  styleUrls: ['./cerrarsesion.page.scss'],
})
export class CerrarsesionPage implements OnInit {

  constructor(
    private router: Router,
    private dataLocalService : DataLocalService
  ) { }

  ngOnInit() {
  }

  cerrarsesion: boolean = false;

  closeSesion(){
    localStorage.removeItem('userLogueado'); 
    this.router.navigate(['/login'],  { replaceUrl: true });
    /* this.dataLocalService.clearUsuerLogin().then((x :boolean) => {
      if(x) {
        this.cerrarsesion =!this.cerrarsesion;
        this.router.navigate(['/login'],  { replaceUrl: true });
      }
    }) */
  }

  cerrarModal() {
    this.cerrarsesion =!this.cerrarsesion;
  }

}
