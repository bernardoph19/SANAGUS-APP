import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder, Validators} from '@angular/forms';
import { Platform, ToastController } from '@ionic/angular';

import { ServiciosGeneralesService } from 'src/app/services/serviciosGenerales.service';
import { ValidadorGeneralService } from 'src/app/services/validadorGeneral.service';
import { Usuario } from 'src/app/models/user.model';
import { DataLocalService } from 'src/app/services/data-local.service';
import { environment } from 'src/environments/environment';

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

  ){ this.CrearFormulario(); }

  
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
    
      .subscribe ( async ( r : any )  =>   {

        if( r.message === "exito" ){

          const result = r.result;
          this.userLogueado = result;

          await this.evaluarPlataforma();          

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

  async evaluarPlataforma() {
    //if (this.platform.is('android') || this.platform.is('ios')) {
    if (environment.browser == false) {
      console.log('dentro de Data Local Service')
      await this.dataLocalService.setUserLogin( this.userLogueado );

    } else {
      console.log('dentro de Local Storage')
      localStorage.setItem('userLogueado', JSON.stringify(this.userLogueado));
    }
  }

  async recordarLogin() {
    if (!environment.browser) {
        
      await this.dataLocalService.getUserLogin().then((x : any) => {
        console.log('Recordardo el Login del Usuario');
        console.log(JSON.stringify(x));
        
        if(x) {                    
          this.router.navigate(['/tabs/pendientes']);
          return true;

        } else { return false; }
      });

    
    } else {

      const userlogeado = JSON.parse(localStorage.getItem('userLogueado'));

      if( userlogeado && userlogeado !== null) {
        this.router.navigate(['/tabs/pendientes']);
        return true
        
      } else { return false; }
      
    } 
  }

}
