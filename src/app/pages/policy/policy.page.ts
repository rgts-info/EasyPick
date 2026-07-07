import { Component, OnInit } from '@angular/core';
import {Platform, NavController} from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-policy',
  templateUrl: './policy.page.html',
  styleUrls: ['./policy.page.scss'],
})
export class PolicyPage implements OnInit {

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

  ngOnInit() {}
  webShare(){
    // check for support of web share API
    if (navigator.share) {
      navigator
        .share({
          title: "This is header/title",
          text: "This is the description",
          url: "https://play.google.com/store/apps/details?id=com.rgtshk.app",
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.error("Browser doesn't support Web Share API");
    }
  } //END; webShare(){

  backToMainPage(){
      // Original logic when there wan't any toast
      this.navCtrl.setDirection('root');
      this.router.navigate(['']);
  }  
}
