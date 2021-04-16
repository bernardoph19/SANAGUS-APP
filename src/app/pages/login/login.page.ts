import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder, Validators} from '@angular/forms';
import { Platform, ToastController } from '@ionic/angular';

import { ServiciosGeneralesService } from 'src/app/services/serviciosGenerales.service';
import { ValidadorGeneralService } from 'src/app/services/validadorGeneral.service';
import { Usuario } from 'src/app/models/user.model';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector    : 'app-login',
  templateUrl : './login.page.html',
  styleUrls   : ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  formSesion        : FormGroup;
  message           : string;
  userLogueado      : Usuario;
  Loading           : boolean = false;
  subcribeSalir     : any;

  constructor(
    
    public  platform         : Platform,
    private loginService     : ServiciosGeneralesService,
    private formBuilder      : FormBuilder,
    private svalidator       : ValidadorGeneralService,
    public  toastController  : ToastController,    
    private router           : Router,
    private dataLocalService : DataLocalService

  ){                

    /* this.dataLocalService.getUserLogin().then((x : any) => {
      if(x.IDUsuario) {
        this.navigateRute()
      }      
    }); */

    /* this.subcribeSalir =  this.platform.backButton.subscribeWithPriority(666666, 
      () => {
          if(this.constructor.name == 'LoginPage') {
            if(window.confirm("Deseas salir de la Aplicacion?")){
              navigator["app"].exitApp();
            }
          }
      }); */
    
    this.CrearFormulario(); 
  }

  
  ngOnInit() {}

  CrearFormulario(){
    this.formSesion = this.formBuilder.group({
      usuario      : [ '', [ Validators.required, Validators.minLength(1)] ],
      password     : [ '', [ Validators.required, Validators.minLength(3) ] ]
    })
  }

  get userNovalido(){
    return this.svalidator.controlInvalid("usuario", this.formSesion);
  }

  get passNovalido(){
    return this.svalidator.controlInvalid("password", this.formSesion);
  }

  async login() {

    if( this.formSesion.invalid ){
      return this.svalidator.emptyData(this.formSesion);
    }

    this.Loading = true;

    const body = {
      ... this.formSesion.value
    };

    this.loginService.postInicioSesion( body )
    
      .subscribe ( ( r : any )  =>   {

        if( r.message === "exito" ){

          const result = r.result;
          this.userLogueado = result;

          this.evaluarPlataforma();
          console.log(JSON.stringify(this.userLogueado));
          
          this.navigateRute();
          this.reset();
          this.Loading = false
        }

      }, ( error ) => {
        this.message = error.error.message ?? "Sin conexion al servidor";
        this.presentToast(error.error.message);
        this.reset();
        this.Loading = false;
      });

  }  

  async presentToast(ms: string) {
    const toast = await this.toastController.create({
      message: ms,
      duration: 3000,
      cssClass:"background"
    });

    toast.present();
  }

  reset(){
    this.formSesion.reset();
  }

  navigateRute(){
    this.router.navigate(['/tabs'],  { replaceUrl: true });
  }

  evaluarPlataforma() {
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.dataLocalService.setUserLogin( this.userLogueado );

    } else {
      localStorage.setItem('userLogueado', JSON.stringify(this.userLogueado));
    }
  }

}
