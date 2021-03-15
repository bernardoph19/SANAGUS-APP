
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrarsesion',
  templateUrl: './cerrarsesion.page.html',
  styleUrls: ['./cerrarsesion.page.scss'],
})
export class CerrarsesionPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  cerrarsesion: boolean = false;

  closeSesion(){
    localStorage.removeItem('userLogueado');
    this.cerrarsesion =!this.cerrarsesion;
    this.router.navigate(['/tabs'],  { replaceUrl: true });
  }

  cerrarModal() {
    this.cerrarsesion =!this.cerrarsesion;
  }

}
