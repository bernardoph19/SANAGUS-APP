import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FiltrarFechaPage } from '../filtrar-fecha/filtrar-fecha.page';
import { LoginserviceService } from 'src/app/services/loginservice.service'; 
import { Pedido } from './../models/user.model';

import { AlertController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {
  listaPedido : Pedido[];

  constructor(
    public modal:MatDialog,    
    private loginService: LoginserviceService,     
    
  ) {

  }

  filtar(){
    this.modal.open(FiltrarFechaPage);
  }
  

  ngOnInit() : void {
    this.loadListPedido();  
  }

  loadListPedido() {
    const userlogueado = JSON.parse(localStorage.getItem('userLogueado'));
    
    const rep = {
      'idusuario' : userlogueado.id
    };

    this.loginService.listarPendientesToday(rep)
    .subscribe( (r : any) => {

      if( r.message === "exito" ){
                
        this.listaPedido  = r.result;        
      }            

    });
  }

  actulziarPedido(id:string) {

    const body = {
      'idventa' : id
    };

    this.loginService.actualizarVenta(body)
    .subscribe( (r : any) => {

      if( r.message === "Venta entragada" ){
                
        this.loadListPedido();   
      }            

    });

    

  }

}
