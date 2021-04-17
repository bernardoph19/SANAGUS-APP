import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { FechaValidarService } from '../../services/fecha-validar.service';
import { HistorialPage } from '../../pages/historial/historial.page';
import { ValidadorGeneralService } from 'src/app/services/validadorGeneral.service';
import { ServiciosGeneralesService } from 'src/app/services/serviciosGenerales.service';
import { Platform } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filtrar-fecha',
  templateUrl: './filtrar-fecha.page.html',
  styleUrls: ['./filtrar-fecha.page.scss'],
})
export class FiltrarFechaPage implements OnInit {

  formDate          : FormGroup;
  Loading           : boolean = false;
  dataLocal         : any;

  loadingc(){
    this.Loading = true;    
  }  

  constructor(
    private fb               : FormBuilder,
    private validarFecha     : FechaValidarService,
    private loginService     : ServiciosGeneralesService,
    private validators       : ValidadorGeneralService,
    public  dialogRef        : MatDialogRef<HistorialPage>,
    public  platform         : Platform,
    private dataLocalService : DataLocalService,

  ) {  this.createForm(); }

  createForm(){
    this.formDate = this.fb.group({
      fechaInicio : [ new Date(), Validators.required ],
      fechaFinal  : [ new Date(), Validators.required ]
    });
  }

  ngOnInit() :  void {
  }

  get fechaEmisionNoVal(){
    return this.validators.controlInvalid('fechaInicio', this.formDate);
  }

  get fechaFinNoVal(){
    return this.validators.controlInvalid('fechaFinal', this.formDate);
  }

  search() {

    if(this.formDate.invalid){
      return this.validators.emptyData(this.formDate);
    }

    const fechaEmision      = this.validarFecha.convertFecha( this.formDate.controls.fechaInicio.value );
    const fechaFin          = this.validarFecha.convertFecha( this.formDate.controls.fechaFinal.value );

    this.listPedidosAtendidos( fechaEmision, fechaFin);

  }

  async listPedidosAtendidos( fechaInicio : string, fechaFin : string) {

    this.loadingc();
    this.evaluarPlataforma();    

    const body = {
      //idusuario   : userlogueado.id,
      idusuario   : this.dataLocal.IDUsuario,
      fechainicio : fechaInicio,
      fechafin    : fechaFin
    };
    
    this.loginService.listarPedidosAtendidos( body )
        .subscribe( (result : any) => {          

          this.dialogRef.close( result.result )
        }, () => {
          this.Loading = false;
        } )

  }

  evaluarPlataforma() {
    //if (this.platform.is('android') || this.platform.is('ios')) {
    if (environment.browser == false) {
      this.dataLocalService.getUserLogin()
        .then((x) => {
          this.dataLocal = x;
        })

    } else {
      this.dataLocal = JSON.parse(localStorage.getItem('userLogueado'));
            
    }
  }

}
