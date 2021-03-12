import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertController } from '@ionic/angular';
import { LoginserviceService } from 'src/app/services/loginservice.service'; 
import { FiltrarFechaPage } from '../filtrar-fecha/filtrar-fecha.page';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  listaPedidoAtendido : any[];  
  
  /* customPickerOptions: any;
  customDate; */

  fechaInicio : Date = new Date();

  constructor( 
    public modal : MatDialog,
    public alertController: AlertController,
    private loginService: LoginserviceService,         

  ) { 

    /* this.customPickerOptions = {
      buttons: [{
        text: 'Aceptar',
        handler: (event) => {
          console.log('Clicked Save!');
          console.log(event);
        }
      }, {
        text: 'Cancelar',
        handler: () => {
          console.log('Clicked Log. Do not Dismiss.');
          return false;
        }
      }]
    } */

  }



  async modalfiltros() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Filtro',

      inputs: [

        {
          cssClass:'',
          name: 'name4',
          type: 'date',
          label: 'Fecha Incio',
          placeholder:'Fecha de inicio',
          min: '2020-01-01',
          max: '2025-01-12'
        },

        {
          name: 'name5',
          value: 2,
          type: 'date',
          label: 'Fecha Fin',
          placeholder:'Fecha de inicio',
          min: '2020-01-01',
          max: '2025-01-12'
        },

      ],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass:'btnn hover:bg-red-600 transition duration-500 ease-in',
          handler: () => {
            console.log('Confirm Cancel');            
          }
        },

         {
          cssClass:'btnn hover:bg-red-600 transition duration-500 ease-in',
          text: 'Aplicar',
          handler: () => { 
            console.log('Confirm Ok');
          }
        }
      ]

    });

    await alert.present();
  }

  /* async abrirModal() {

    const modal = await this.modalCtrl.create({
      component: ModalfechaPage,
      componentProps: {
        nombre: 'Fernando',
        pais: 'Costa Rica'
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    console.log('Retorno del modal', data );

  } */


  loadListPedidoAtendido() {
        
    const userlogueado = JSON.parse(localStorage.getItem('userLogueado'));
    
    const body = {
      'idusuario'   : userlogueado.id,
      'fechainicio' : "2021/03/11",
      'fechafin'    : "2021/03/11",
    };
    

    this.loginService.listarPedidosAtendidos(body)
    .subscribe( (r : any) => {

      if( r.message === "exito" ){
                
        this.listaPedidoAtendido  = r.result;        
      }            

    });
  }

  seleccionaFechaInicio(event) {
    console.log('ionChange', event)
    console.log('Date', new Date (event.detail.value ))

  }

  filtar(){
    this.modal.open(FiltrarFechaPage);
  }


  ngOnInit() {
    this.loadListPedidoAtendido();
  }

}
