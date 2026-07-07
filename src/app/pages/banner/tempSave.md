//ssh -i "hongkong-kp.pem" centos@16.163.74.166
// /import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';

import { CurrentplatformService } from '../../provider/currentplatform.service';
import {Platform, NavController, GestureController, Gesture} from '@ionic/angular';
import { Router } from '@angular/router';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper/types/swiper-options';


// import SwiperCore, {
//   Pagination
// } from 'swiper/core';

import SwiperCore, {
  Pagination,
  EffectFlip,
  Navigation
} from 'swiper';

SwiperCore.use([Pagination, EffectFlip, Navigation]);

@Component({
  selector: 'app-banner',
  templateUrl: './banner.page.html',
  styleUrls: ['./banner.page.scss'],
  encapsulation: ViewEncapsulation.None
})

//AfterViewInit
//export class BannerPage implements OnInit, AfterContentChecked {
export class BannerPage implements OnInit, AfterViewInit {

  @ViewChild('pinchElement', { read: ElementRef }) pinchElement: ElementRef;
  @ViewChild('swiper') swiper: SwiperComponent;

  @ViewChild('pinchElement1', { static: false }) pinchElement1: ElementRef;
  @ViewChild('pinchElement2', { static: false }) pinchElement2: ElementRef;



  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    keyboard: {
      enabled: true
    },
    pagination: {
      clickable: true
    },
    effect: 'flip',
    grabCursor: false,
    navigation: true
  };

  running_on_mobile_boolean: boolean;

  private scale: number = 1;
  private baseScale: number = 1;
  private startX: number = 0;
  private startY: number = 0;



  constructor(private currentplatformService: CurrentplatformService,
              private platform: Platform,
              private navCtrl : NavController, 
              private router: Router,
              private gestureCtrl: GestureController,)
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
                      // console.log("running in a browser on mobile!");
                      this.running_on_mobile_boolean = true;
                  }else
                  {
                    this.running_on_mobile_boolean = false;
                  };

                  // console.log('Width: ' + platform.width());
                  // console.log('Height: ' + platform.height());


              });

              }

  ngOnInit() {
    // const checkPlatform = this.currentplatformService.get_currentPlatform();

    // console.log("INSIDE banner page check checkPlatform= ", checkPlatform);

  }

  /* REMARK: 12102024 Replace with AfterViewInit
  ngAfterContentChecked(): void {
    if (this.swiper){
      this.swiper.updateSwiper({});
      
    }
  }
  */

  ngAfterViewInit() {

    if (this.swiper){
      this.swiper.updateSwiper({});
      
    }
    this.createPinchToZoomGesture();
  }



  webShare(){
    // check for support of web share API
    if (navigator.share) {
      navigator
        .share({
          title: "走地通下載連結",
          text: "按一按連結即可下載及安裝",
          url: "https://play.google.com/store/apps/details?id=com.rgtshk.app",
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.error("Browser doesn't support Web Share API");
    }

  } //END; webShare(){

  openGoogleAppStore(){

    window.open("https://play.google.com/store/apps/details?id=com.rgtshk.app", "_blank");

  } //END: openGoogleAppStore(){

  openPolicy(){

    // window.open("https://www.rgts-hk.com/policy/index.html", "_blank");


    this.navCtrl.setDirection('forward', false);
    this.router.navigateByUrl('/policy');


  } //END: openGoogleAppStore(){

  contactUs(){

    // window.open("https://www.rgts-hk.com/policy/index.html", "_blank");

    this.navCtrl.setDirection('forward', false);
    this.router.navigateByUrl('/contact');

  } //END: contactUs()

  swiperSlideChanged(e) {
    console.log('Changed: ', e);
    
  }

  createPinchToZoomGesture() {
    const gesture: Gesture = this.gestureCtrl.create({
      el: this.pinchElement.nativeElement,
      gestureName: 'pinch',
      onStart: ev => this.onPinchStart(ev),
      onMove: ev => this.onPinchMove(ev),
      onEnd: ev => this.onPinchEnd(ev)
    });
    gesture.enable(true);
  }

  onPinchStart(ev) {
    this.baseScale = this.scale;
    const origin = this.getTransformOrigin(ev);
    this.startX = origin.x;
    this.startY = origin.y;
  }

  onPinchMove(ev) {
    const scale = this.baseScale * ev.scale;
    this.applyScale(scale);
  }

  onPinchEnd(ev) {
    this.scale = this.baseScale * ev.scale;
  }

  applyScale(scale) {
    this.pinchElement.nativeElement.style.transform = `scale(${scale})`;
  }

  getTransformOrigin(ev) {
    const rect = this.pinchElement.nativeElement.getBoundingClientRect();
    const x = ev.center.x - rect.left;
    const y = ev.center.y - rect.top;
    return { x, y };
  }




}
