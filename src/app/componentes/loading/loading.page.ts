import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor() { }

  @Input()  loadin:boolean = false;
  
  ngOnInit() {
  }
  

  loadingGC(){
      this.loadin =!this.loadin;
  }
}
