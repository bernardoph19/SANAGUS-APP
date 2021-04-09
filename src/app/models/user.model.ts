import { IonDatetime } from "@ionic/angular";
export class mdUser{    
    usuario     : string;
    password    : string;    
}
export class mdRepartidor{    
    idusuario: string;    
}
export class mdPedido{    
    idventa: string;    
}
export class mdPedidoAtendido{    
    idusuario   : string;
    fechainicio : string;
    fechafin    : string;
}
export interface Pedido {
    IDVenta             : string;
    Fecha               : IonDatetime;
    HoraEntrega         : string;
    NumeroDocumento     : string;
    Cliente             : string;
    Telefono            : string;
    DireccionEnvio      : string;
    Total               : DoubleRange;
    Descripcion         : string;
    Repartidor          : string;
    Estado              : string;
    IDRepartidor        : string;
}
export interface Usuario {
    IDUsuario             : string;
    Usuario               : IonDatetime;
    Estado                : string;
    TipoUsuario           : string;    
}