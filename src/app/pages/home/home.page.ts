import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Pedido } from 'src/app/models/user.model';
import { ServiciosGeneralesService } from 'src/app/services/serviciosGenerales.service';
import { ValidadorGeneralService } from 'src/app/services/validadorGeneral.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {

  listaPedido       : Pedido[];
  textoBuscar       = '';
  Loading           : Boolean = false;

  constructor(
    public modal:MatDialog,
    private loginService: ServiciosGeneralesService,    
    private validar: ValidadorGeneralService,

  ) { }

  ngOnInit() : void {
   this.loadListPedido();
  }

  async loadListPedido() {

    this.Loading = true;
    const userlogueado = JSON.parse(localStorage.getItem('userLogueado'));
    const rep = {  'idusuario' : userlogueado.id };

    this.loginService.listarPendientesToday(rep)
      .subscribe( (r : any) => {

        if( r.message === "exito" ) {
           this.listaPedido  = r.result
           this.Loading = false
        }        

      }, () => {
        this.Loading = false
      })
      .add( () => {
        /* this.Loading = false */
      })
      
  }

  actulziarPedido(id:string) {
    
    this.Loading = true;

    const body = {  'idventa' : id };

    this.loginService.actualizarVenta(body)
    .subscribe( (r : any) => {

      if( r.message === "Venta entragada" ){ this.loadListPedido(); }

    }, () => {  });

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
  
}
