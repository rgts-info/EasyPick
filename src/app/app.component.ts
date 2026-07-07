import { Component, OnInit } from '@angular/core';

// private hkjcsportServiceProvider : HkjcsportserviceProvider,
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  show_spinner: boolean = true;

  constructor() {

    console.log("INSIDE listing-easypick GitHub page app.components.ts");
    

  }

  ngOnInit() {
    console.log('Spinner state:', this.show_spinner);
  }


}
