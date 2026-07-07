import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { GestureController, Gesture, Platform } from '@ionic/angular';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrls: ['./image-zoom.component.scss'],
})
export class ImageZoomComponent implements AfterViewInit {
  @ViewChild('pinchElement', { read: ElementRef }) pinchElement: ElementRef;

  private scale: number = 1;
  private baseScale: number = 1;
  private startX: number = 0;
  private startY: number = 0;

  constructor(private gestureCtrl: GestureController, private platform: Platform) {}

  ngAfterViewInit() {
    this.createPinchToZoomGesture();
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
