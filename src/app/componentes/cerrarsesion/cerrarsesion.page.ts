
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cerrarsesion',
  templateUrl: './cerrarsesion.page.html',
  styleUrls: ['./cerrarsesion.page.scss'],
})
export class CerrarsesionPage implements OnInit {

  constructor(
    private router           : Router,
    private dataLocalService : DataLocalService,
    public  platform         : Platform,

  ) { }

  ngOnInit() {
  }

  cerrarsesion: boolean = false;

  closeSesion(){    
  
    this.evaluarPlataforma();
  }

  cerrarModal() {
    this.cerrarsesion =!this.cerrarsesion;
  }

  evaluarPlataforma() {

    //if (this.platform.is('android') || this.platform.is('ios')) {
    if (environment.browser == false) {
      this.dataLocalService.clearUsuerLogin();

    } else {
      localStorage.removeItem('userLogueado'); 
    }

    this.router.navigate(['/login'],  { replaceUrl: true });

  }

}
