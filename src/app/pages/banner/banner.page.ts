//ssh -i "hongkong-kp.pem" centos@16.163.74.166
// /import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { Component, ViewEncapsulation, AfterViewInit, Renderer2, OnDestroy, ElementRef } from '@angular/core';

import { CurrentplatformService } from '../../provider/currentplatform.service';
//import {Platform, NavController, GestureController, Gesture} from '@ionic/angular';
import {Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

// import { SwiperComponent } from 'swiper/angular';
// import { SwiperOptions } from 'swiper/types/swiper-options';


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
export class BannerPage implements AfterViewInit, OnDestroy {

  private removeListeners: (() => void)[] = [];

  //@ViewChild('pinchElement', { read: ElementRef }) pinchElement: ElementRef;
  // @ViewChild('swiper') swiper: SwiperComponent;

  // @ViewChild('pinchElement1', { static: true }) pinchElement1: ElementRef;
  // @ViewChild('pinchElement2', { static: true }) pinchElement2: ElementRef;
  // @ViewChild('pinchElement3', { static: true }) pinchElement3: ElementRef;
  // @ViewChild('pinchElement4', { static: true }) pinchElement4: ElementRef;

  /*
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
  */
  running_on_mobile_boolean: boolean;

  constructor(private currentplatformService: CurrentplatformService,
              private renderer: Renderer2,
              private platform: Platform,
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

  /*
  ngOnInit(): void {
    // const checkPlatform = this.currentplatformService.get_currentPlatform();

    // console.log("INSIDE banner page check checkPlatform= ", checkPlatform);

  }
  */


  /* REMARK: 12102024 Replace with AfterViewInit
  ngAfterContentChecked(): void {
    if (this.swiper){
      this.swiper.updateSwiper({});
      
    }
  }
  */

  /*
    ngAfterViewInit() {

      console.log("INSIDE ngAfterViewInit...");

      // 
      // if (this.swiper){
      //   this.swiper.updateSwiper({});
      // }
      // 

      // this.setupPinchToZoom(this.pinchElement1.nativeElement);
      // this.setupPinchToZoom(this.pinchElement2.nativeElement);
      // this.setupPinchToZoom(this.pinchElement3.nativeElement);
      // this.setupPinchToZoom(this.pinchElement4.nativeElement);

      // setTimeout(() => {
      //   this.initializePinchToZoom();
      // }, 1000); // Adding a slight delay to ensure elements are available

      // 
      // setTimeout(() => {
      //   this.initializePinchToZoom();
      // }, 100); // Adjust delay as needed
      // 

      // Initialize the meta tag reference
      this.metaTag = this.renderer.createElement('meta');
      this.renderer.setAttribute(this.metaTag, 'name', 'viewport');
      this.renderer.setAttribute(this.metaTag, 'content', 'viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no');
      this.renderer.appendChild(document.head, this.metaTag);

      this.setupIntersectionObserver();
    }
  */

  ngAfterViewInit() {
    this.setupPinchToZoom();
  }


  /*
    initializePinchToZoom()
    {
      try {
        const pinchElement1 = document.querySelector('#pinchElement1');
        const pinchElement2 = document.querySelector('#pinchElement2');
        const pinchElement3 = document.querySelector('#pinchElement3');
        const pinchElement4 = document.querySelector('#pinchElement4');
        // const pinchElement5 = document.querySelector('#pinchElement5');
        // const pinchElement6 = document.querySelector('#pinchElement6');

        // Add more queries for other elements

        if (pinchElement1) {
          this.setupPinchToZoom(pinchElement1);
        } else {
          console.error('Element pinchElement1 not available');
        }

        if (pinchElement2) {
          this.setupPinchToZoom(pinchElement2);
        } else {
          console.error('Element pinchElement2 not available');
        }

        if (pinchElement3) {
          this.setupPinchToZoom(pinchElement3);
        } else {
          console.error('Element pinchElement3 not available');
        }

        if (pinchElement4) {
          this.setupPinchToZoom(pinchElement4);
        } else {
          console.error('Element pinchElement4 not available');
        }

        // if (pinchElement5) {
        //   this.setupPinchToZoom(pinchElement5);
        // } else {
        //   console.error('Element pinchElement5 not available');
        // }

        // if (pinchElement6) {
        //   this.setupPinchToZoom(pinchElement6);
        // } else {
        //   console.error('Element pinchElement6 not available');
        // }

        // Add more setup calls for other images

      } catch (error) {
        console.error('Error initializing pinch-to-zoom:', error);
      }
    } //END: initializePinchToZoom
  */

  /*  
    setupPinchToZoom(el: Element) {
      let scale = 1;
      let lastScale = 1;

      this.renderer.setStyle(el, 'transformOrigin', 'center center');

      const handleGestureStart = (event: any) => {
        lastScale = scale;
        console.log('Gesture start');
      };

      const handleGestureChange = (event: any) => {
        scale = Math.max(0.5, Math.min(lastScale * event.scale, 3)); // Limit scale between 0.5 and 3
        this.renderer.setStyle(el, 'transform', `scale(${scale})`);
        console.log('Gesture change', scale);
      };

      const handleGestureEnd = (event: any) => {
        lastScale = scale;
        console.log('Gesture end');
      };

      el.addEventListener('gesturestart', handleGestureStart);
      el.addEventListener('gesturechange', handleGestureChange);
      el.addEventListener('gestureend', handleGestureEnd);

      // Store references to remove them later
      this.removeListeners.push(() => {
        el.removeEventListener('gesturestart', handleGestureStart);
        el.removeEventListener('gesturechange', handleGestureChange);
        el.removeEventListener('gestureend', handleGestureEnd);
      });
    } //END: setupPinchToZoom
  */  



  ngOnDestroy() {
    // Remove event listeners to prevent memory leaks
    this.removeListeners.forEach(removeFn => removeFn());
  }


  setupPinchToZoom() {
    const pinchElements = document.querySelectorAll('.responsive-img');
    pinchElements.forEach(el => {
      this.setupZoomEvents(el as HTMLElement);
    });
  }

  setupZoomEvents(el: HTMLElement) {
    let scale = 1;
    let lastScale = 1;

    this.renderer.setStyle(el, 'transformOrigin', 'center center');

    const handleGestureStart = (event: any) => {
      lastScale = scale;
      console.log('Gesture start');
    };

    const handleGestureChange = (event: any) => {
      scale = Math.max(0.5, Math.min(lastScale * event.scale, 3)); // Limit scale between 0.5 and 3
      this.renderer.setStyle(el, 'transform', `scale(${scale})`);
      console.log('Gesture change', scale);
    };

    const handleGestureEnd = (event: any) => {
      lastScale = scale;
      console.log('Gesture end');
    };

    el.addEventListener('gesturestart', handleGestureStart);
    el.addEventListener('gesturechange', handleGestureChange);
    el.addEventListener('gestureend', handleGestureEnd);

    // Store references to remove them later
    this.removeListeners.push(() => {
      el.removeEventListener('gesturestart', handleGestureStart);
      el.removeEventListener('gesturechange', handleGestureChange);
      el.removeEventListener('gestureend', handleGestureEnd);
    });
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


}
