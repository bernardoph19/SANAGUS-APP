import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertController } from '@ionic/angular';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { FiltrarFechaPage } from '../filtrar-fecha/filtrar-fecha.page';
import { ValidadoresService } from 'src/app/login/validationLogin.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  listaPedidoAtendido : any[];
  textoBuscar = '';
  fechaInicio : Date = new Date();

  constructor(
    public  modal : MatDialog,
    public  alertController: AlertController,
    private loginService: LoginserviceService,
    private validar: ValidadoresService,

  ) {    }

  loadListPedidoAtendido(fechaInicio: string , fechaFinal : string) {

    const userlogueado = JSON.parse(localStorage.getItem('userLogueado'));

    const body = {
      'idusuario'   : userlogueado.id,
      'fechainicio' : fechaInicio,
      'fechafin'    : fechaFinal,
    };


    this.loginService.listarPedidosAtendidos(body)
    .subscribe( (r : any) => {

      if( r.message === "exito" ){

        this.listaPedidoAtendido  = r.result;
      }

    }, () => { });
  }

  seleccionarFechas() {

    this.modal.open( FiltrarFechaPage)
    .afterClosed()
    .subscribe( response => { this.listaPedidoAtendido = response; } );

  }

  ngOnInit() {
    //this.loadListPedidoAtendido();
  }

  get noData(){
    return this.validar.sinResultado(this.listaPedidoAtendido);
  }

  buscar( event : any ) {    
    this.textoBuscar = event.detail.value;
  }

}
