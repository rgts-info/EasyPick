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
    this.setupPinchToZoom();
  }

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
}
