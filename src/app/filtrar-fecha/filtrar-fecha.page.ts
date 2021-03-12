import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { ValidadoresService } from 'src/app/login/validationLogin.service';

import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';
import { FechaValidarService } from '../services/fecha-validar.service';

@Component({
  selector: 'app-filtrar-fecha',
  templateUrl: './filtrar-fecha.page.html',
  styleUrls: ['./filtrar-fecha.page.scss'],
})
export class FiltrarFechaPage implements OnInit {
  
  formFecha          : FormGroup;

  constructor(
    private fb           : FormBuilder,
    private validarFecha      : FechaValidarService,
    private loginService : LoginserviceService,
    private validators   : ValidadoresService,

  ) { 
    const fechaActual = this.validarFecha.fechaActual();
  }

  createForm(){
    this.formFecha = this.fb.group({
      fechaemision : [ new Date(), Validators.required ],
      fechafin    : [ new Date(), Validators.required ]
    });
  }

  ngOnInit() :  void {
  }

  get fechaEmisionNoVal(){
    return this.validators.control_invalid('fechaemision', this.formFecha);
  }

  get fechaFinNoVal(){
    return this.validators.control_invalid('fechafin', this.formFecha);
  }

  search(){

    if(this.formFecha.invalid){
      return this.validators.Empty_data(this.formFecha);
    }

    const fechaEmision      = this.validarFecha.convertFecha( this.formFecha.controls.fechaemision.value );
    const fechaFin          = this.validarFecha.convertFecha( this.formFecha.controls.fechafin.value );    

    this.listPedidosAtendidos( "0", fechaEmision, fechaFin);

  }

  listPedidosAtendidos( fechaInicio : string, fechaFin : string, id : string) {
    const userlogueado = JSON.parse(localStorage.getItem('userLogueado'));

    const body = {
      idusuario   : userlogueado.id,
      fechainicio : fechaInicio,
      fechafin    : fechaFin
    };

    this.loginService.listarPedidosAtendidos( body )
                .subscribe( (result : any) => {
                  console.log(result);
                  
                }, () => {} )
  }

}
