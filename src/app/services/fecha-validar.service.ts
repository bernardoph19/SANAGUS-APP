import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechaValidarService {

  constructor() { }

  fechaActual() : string {
    let fecha : string;
    const dat = new Date();
    const dia = dat.getDate();
    const mes = dat.getMonth() + 1;
    const año = dat.getFullYear();

    if(mes < 10) fecha = `${año}-0${mes}-${dia}`;
    else  fecha = `${año}-${mes}-${dia};`
    return fecha;
  }

  convertFecha( fecha : string ){
    
    const dat = new Date( fecha );
    const dia = dat.getDate();
    const mes = dat.getMonth() + 1;
    const año = dat.getFullYear();

    if(mes < 10) fecha = `${año}-0${mes}-${dia}`;
    else  fecha = `${año}-${mes}-${dia};`
    return fecha;
  }
}
