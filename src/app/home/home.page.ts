import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { ValidadoresService } from 'src/app/login/validationLogin.service';
import { Pedido } from './../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {

  listaPedido       : Pedido[];
  textoBuscar       = '';
  loading           : Boolean = false;

  constructor(
    public modal:MatDialog,
    private loginService: LoginserviceService,    
    private validar: ValidadoresService,

  ) { }

  ngOnInit() : void {
   this.loadListPedido();
  }

  async loadListPedido() {

    this.loading = true;
    const userlogueado = JSON.parse(localStorage.getItem('userLogueado'));
    const rep = {
      'idusuario' : userlogueado.id
    };

    this.loginService.listarPendientesToday(rep)
      .subscribe( (r : any) => {

        if( r.message === "exito" ){ this.listaPedido  = r.result; }

      }, () => { this.loading = false; });
  }

  actulziarPedido(id:string) {
    
    this.loading = true;

    const body = {  'idventa' : id };

    this.loginService.actualizarVenta(body)
    .subscribe( (r : any) => {

      if( r.message === "Venta entragada" ){ this.loadListPedido(); }

    }, () => { this.loading = false;});

  }

  get noData(){
    return this.validar.sinResultado(this.listaPedido);
  }

  buscar( event : any ) {    
    this.textoBuscar = event.detail.value;
  }
}
