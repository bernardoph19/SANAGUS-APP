import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertController, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';

import { Pedido } from './../models/user.model';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { ValidadoresService } from 'src/app/login/validationLogin.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {

  listaPedido : Pedido[];
  textoBuscar = '';

  constructor(
    public modal:MatDialog,
    private loginService: LoginserviceService,
    private loadingCtrl: LoadingController,
    private validar: ValidadoresService,

  ) {

  }


  ngOnInit() : void {
   this.loadListPedido();
  }

  async loadListPedido() {

    let loading = await this.loadingCtrl.create();
    await loading.present();

    const userlogueado = JSON.parse(localStorage.getItem('userLogueado'));
    const rep = {
      'idusuario' : userlogueado.id
    };

    let callAPI = this.loginService.listarPendientesToday(rep);

        from(callAPI).pipe(
          finalize( () => loading.dismiss() )
        )

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

  get noData(){
    return this.validar.sinResultado(this.listaPedido);
  }

  buscar( event : any ) {
    //console.log(event.detail.value);
    this.textoBuscar = event.detail.value;
  }
}
