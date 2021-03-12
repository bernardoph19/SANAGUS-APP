import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mdUser, mdRepartidor, mdPedido, mdPedidoAtendido } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(
    private http: HttpClient,
  ) { }

  postInicioSesion( modeloUser : mdUser ){        
    
    return this.http.post('https://agustin.innovated.xyz/api/seguridad/usuario/iniciosesion', modeloUser, {               
      headers: new HttpHeaders({
        'Content-Type'  : "application/json",
        'Authorization' : "INNOVATED"
      })
    });
    
  }
  
  listarPendientesToday( modeloRepartidor : mdRepartidor){

    return this.http.post('https://agustin.innovated.xyz/api/administracion/repartidor/repartidorentregaspendientes',  modeloRepartidor, {
      headers: new HttpHeaders({
        'Content-Type'  : "application/json",
        'Authorization' : "INNOVATED"
      })
    });
  
  }
  
  actualizarVenta( modelVenta : mdPedido){

    return this.http.post('https://agustin.innovated.xyz/api/venta/comprobante/ventaentregada',  modelVenta, {
      headers: new HttpHeaders({
        'Content-Type'  : "application/json",
        'Authorization' : "INNOVATED"
      })
    });
  
  }

  listarPedidosAtendidos( modelVentaEntregada : mdPedidoAtendido){

    return this.http.post('https://agustin.innovated.xyz/api/administracion/repartidor/repartidorentregasrealizadas',  modelVentaEntregada, {
      headers: new HttpHeaders({
        'Content-Type'  : "application/json",
        'Authorization' : "INNOVATED"
      })
    });
  
  }


}
