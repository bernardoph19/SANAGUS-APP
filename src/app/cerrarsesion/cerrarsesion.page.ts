
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cerrarsesion',
  templateUrl: './cerrarsesion.page.html',
  styleUrls: ['./cerrarsesion.page.scss'],
})
export class CerrarsesionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  cerrarsesion: boolean = false;
  close(){
    this.cerrarsesion =!this.cerrarsesion;
  }

}
