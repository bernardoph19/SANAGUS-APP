import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input()  loadin:boolean = false;

  loadingGC(){
      this.loadin =!this.loadin;
  }
}
