import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiciosGeneralesService } from 'src/app/services/serviciosGenerales.service';
import { FiltrarFechaPage } from 'src/app/componentes/filtrar-fecha/filtrar-fecha.page';
import { ValidadorGeneralService } from 'src/app/services/validadorGeneral.service';
import { DataLocalService } from 'src/app/services/data-local.service';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  listaPedidoAtendido : any[];
  textoBuscar         = '';
  fechaInicio         : Date = new Date();
  idUsuario           : string;

  constructor(
    public  modal : MatDialog,    
    private loginService: ServiciosGeneralesService,
    private validar: ValidadorGeneralService,
    private dataLocalService : DataLocalService

  ) {    }

  loadListPedidoAtendido(fechaInicio: string , fechaFinal : string) {

    //const userlogueado = JSON.parse(localStorage.getItem('userLogueado'));

    this.dataLocalService.getUserLogin().then( (x : any) => {
      if(x) {
        this.idUsuario = x.IDUsuario;
      }            
    });

    const body = {
      'idusuario'   : this.idUsuario,
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
