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

  ) {    }  

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
