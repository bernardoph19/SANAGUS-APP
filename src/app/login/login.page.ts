import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
/* import { LoginService } from './login.service.service'; */
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder, Validators} from '@angular/forms';
import { ValidadoresService } from 'src/app/login/validationLogin.service';
import { ToastController } from '@ionic/angular';

import { finalize } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  formSesion: FormGroup;
  message : string;
  userLogueado : any;

  constructor(

    public loadingController: LoadingController,
    private loginService: LoginserviceService,
    private formBuilder: FormBuilder,
    private svalidator: ValidadoresService,

    private loadingCtrl: LoadingController,
    public toastController: ToastController,

    //private loginService: LoginService,
    private router: Router,

  ) { this.CrearFormulario(); }

  ngOnInit() {
  }

  CrearFormulario(){
    this.formSesion = this.formBuilder.group({
      usuario      : [ '', [ Validators.required, Validators.minLength(1)] ],
      password     : [ '', [ Validators.required, Validators.minLength(3) ] ]
    })
  }

  get userNovalido(){
    return this.svalidator.control_invalid("usuario", this.formSesion);
  }

  get passNovalido(){
    return this.svalidator.control_invalid("password", this.formSesion);
  }

  async login(){

    if( this.formSesion.invalid ){
      return this.svalidator.Empty_data(this.formSesion);
    }

    let loading = await this.loadingCtrl.create();
    await loading.present();

    const body = {
      ... this.formSesion.value
    };

    let call = this.loginService.postInicioSesion( body );
      from(call).pipe(
        finalize( () => loading.dismiss() )
      )

      .subscribe ( ( r : any )  =>  {

        if( r.message === "exito" ){

          const result = r.result;    
          
          this.userLogueado = { id: result.IDUsuario, user : result.Usuario, tipousuario : result.TipoUsuario }
          localStorage.setItem('userLogueado', JSON.stringify(this.userLogueado));                     
          this.navigateRute();
          this.reset();

          
        }

      }, ( error )=>{
        this.message = error.error.message ?? "Sin conexion al servidor";
        this.presentToast(error.error.message);
        this.reset()
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
    this.router.navigate(['/tabs']);
  }

}
