import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Pedido } from 'src/app/models/user.model';
import { ServiciosGeneralesService } from 'src/app/services/serviciosGenerales.service';
import { ValidadorGeneralService } from 'src/app/services/validadorGeneral.service';
import { DataLocalService } from 'src/app/services/data-local.service';
import { Platform, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {

  listaPedido       : Pedido[];
  textoBuscar       = '';
  Loading           : boolean = false;
  idUsuario         : string;
  message           : string;
  dataLocal         : any;
  

  constructor(
    public  modal             : MatDialog,
    private loginService     : ServiciosGeneralesService,
    private validar          : ValidadorGeneralService,
    private dataLocalService : DataLocalService,
    public  toastController  : ToastController,
    public  platform         : Platform,

  ) { }

  ngOnInit() : void {
   this.loadListPedido();
  }

  async loadListPedido() {

    this.Loading = true;

    /* this.dataLocalService.getUserLogin().then( (x : any) => {
      if(x) {
        this.idUsuario = x.IDUsuario;
      }            
    }); */    
        
    this.evaluarPlataforma();
    const rep = {  'idusuario' : this.dataLocal.idUsuario };

    this.loginService.listarPendientesToday(rep)
      .subscribe( (r : any) => {

        if( r.message === "exito" ) {
           this.listaPedido  = r.result
           this.Loading = false
        }

      }, (error) => {
        debugger;
        this.Loading = false;
        this.message = error.error.message ?? "Sin conexion al servidor";
        this.presentToast(this.message);
      });
      
  }

  actulziarPedido(id:string) {
    
    this.Loading = true;

    const body = {  'idventa' : id };

    this.loginService.actualizarVenta(body)
    .subscribe( (r : any) => {

      if( r.message === "Venta entragada" ){ this.loadListPedido(); }

    }, (error) => { 
      this.Loading = false;
      this.message = error.error.message ?? "Sin conexion al servidor";
      this.presentToast(this.message);

    });

  }

  get noData(){
    return this.validar.sinResultado(this.listaPedido);
  }

  buscar( event : any ) {    
    this.textoBuscar = event.detail.value;
  }

  regargar(event : any) {
    
    this.loadListPedido().finally( () => {
      event.target.complete();
    });        
  }

  async presentToast(ms: string) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 3000,
      cssClass:"background"
    });

    toast.present();
  }

  evaluarPlataforma() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.dataLocalService.getUserLogin()
        .then((x) => {
          this.dataLocal = x;
        })

    } else {
      this.dataLocal = JSON.parse(localStorage.getItem('userLogueado'));
    }
  }
  
}
