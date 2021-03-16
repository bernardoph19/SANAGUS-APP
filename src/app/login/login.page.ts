import { Component, OnInit } from '@angular/core';
import { LoginserviceService } from 'src/app/services/loginservice.service';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder, Validators} from '@angular/forms';
import { ValidadoresService } from 'src/app/login/validationLogin.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  formSesion        : FormGroup;
  message           : string;
  userLogueado      : any;
  Loading           : Boolean = false;

  constructor(
    
    private loginService: LoginserviceService,
    private formBuilder: FormBuilder,
    private svalidator: ValidadoresService,
    public toastController: ToastController,    
    private router: Router,

  ){ this.CrearFormulario(); }
  
  ngOnInit() {}

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

  async login() {

    if( this.formSesion.invalid ){
      return this.svalidator.Empty_data(this.formSesion);
    }

    this.Loading = true;

    const body = {
      ... this.formSesion.value
    };

    this.loginService.postInicioSesion( body )
    
      .subscribe ( ( r : any )  =>  {

        if( r.message === "exito" ){

          const result = r.result;    
          
          this.userLogueado = { id: result.IDUsuario, user : result.Usuario, tipousuario : result.TipoUsuario }
          localStorage.setItem('userLogueado', JSON.stringify(this.userLogueado));                     
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

}
