import { Component, OnInit } from '@angular/core';
import {Platform, NavController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  running_on_mobile_boolean: boolean ;

  constructor(private platform: Platform,
              private navCtrl : NavController, 
              private router: Router)
  {
    platform.ready().then((source) => {

      // console.log("platform source " + source);

      if (this.platform.is('android')) {
          // console.log("running on Android device!");
      };
      if (this.platform.is('ios')) {
          // console.log("running on iOS device!");
      };
      if (this.platform.is('mobileweb'))
      {
          console.log("running in a browser on mobile!");
          this.running_on_mobile_boolean = true;
      }else
      {
        console.log("NOT running in a browser on mobile!");
        this.running_on_mobile_boolean = false;
      };

    });
  }  

  ngOnInit() {
  }

  backToMainPage(){
      // Original logic when there wan't any toast
      this.navCtrl.setDirection('root');
      this.router.navigate(['']);
  }

}
