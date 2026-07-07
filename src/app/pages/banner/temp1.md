import { Component, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.scss'],
})
export class ImageZoomComponent implements AfterViewInit, OnDestroy {
  private removeListeners: (() => void)[] = [];

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializePinchToZoom();
    }, 100); // Ensure elements are loaded
  }

  ngOnDestroy() {
    // Remove event listeners to prevent memory leaks
    this.removeListeners.forEach(removeFn => removeFn());
  }

  initializePinchToZoom() {
    try {
      const pinchElement1 = document.querySelector('#pinchElement1');
      const pinchElement2 = document.querySelector('#pinchElement2');
      const pinchElement3 = document.querySelector('#pinchElement3');
      const pinchElement4 = document.querySelector('#pinchElement4');

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

      // Add more setup calls for other images
    } catch (error) {
      console.error('Error initializing pinch-to-zoom:', error);
    }
  }

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
  }
}
