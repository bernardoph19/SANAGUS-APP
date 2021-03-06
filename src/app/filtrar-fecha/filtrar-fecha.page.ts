import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { ValidadoresService } from 'src/app/login/validationLogin.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FechaValidarService } from '../services/fecha-validar.service';
import { HistorialPage } from '../historial/historial.page';

@Component({
  selector: 'app-filtrar-fecha',
  templateUrl: './filtrar-fecha.page.html',
  styleUrls: ['./filtrar-fecha.page.scss'],
})
export class FiltrarFechaPage implements OnInit {

  formDate          : FormGroup;
  Loading           : Boolean = false;

  loadingc(){
    this.Loading = true;    
  }  

  constructor(
    private fb           : FormBuilder,
    private validarFecha : FechaValidarService,
    private loginService : LoginserviceService,
    private validators   : ValidadoresService,
    public  dialogRef    : MatDialogRef<HistorialPage>,    

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
    return this.validators.control_invalid('fechaInicio', this.formDate);
  }

  get fechaFinNoVal(){
    return this.validators.control_invalid('fechaFinal', this.formDate);
  }

  search() {

    if(this.formDate.invalid){
      return this.validators.Empty_data(this.formDate);
    }

    const fechaEmision      = this.validarFecha.convertFecha( this.formDate.controls.fechaInicio.value );
    const fechaFin          = this.validarFecha.convertFecha( this.formDate.controls.fechaFinal.value );

    this.listPedidosAtendidos( fechaEmision, fechaFin);

  }

  async listPedidosAtendidos( fechaInicio : string, fechaFin : string) {

    this.loadingc();

    const userlogueado = JSON.parse(localStorage.getItem('userLogueado'));

    const body = {
      idusuario   : userlogueado.id,
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

}
