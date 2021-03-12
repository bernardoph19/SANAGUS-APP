import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FiltrarFechaPage } from '../filtrar-fecha/filtrar-fecha.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  constructor(public modal:MatDialog) {}

  filtar(){
    this.modal.open(FiltrarFechaPage);
  }

}
