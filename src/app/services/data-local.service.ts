import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Usuario } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor( private nativeStorage: NativeStorage ) { }

  async setUserLogin (user :  Usuario) {
    await this.nativeStorage.setItem('userLogueado', user)
      .then(
        () => {          
          console.log('guardando en el native storage ');
          console.log(JSON.stringify(user));
        },
        error => {
          console.error('Error storing item');
          console.error(JSON.stringify(error));
        }
      );

  }

  getUserLogin () {
    return this.nativeStorage.getItem('userLogueado')
      .then(
        data => {
          console.log('dentro del GET');
          console.log(JSON.stringify(data));
          return data;
          //return true;
        },
        error => {          
          return error;
          //return false;
        }
      );

  }

  async clearUsuerLogin () {
    return this.nativeStorage.clear().then(() => {
      return true;
    })

  }

}
