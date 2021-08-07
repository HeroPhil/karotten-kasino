import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-lottie',
  template: `
    <ng-lottie [options]="options" (animationCreated)="animationCreated($event)"></ng-lottie>
  `,
})
export class LottiComponent {
  options: AnimationOptions = {
    path: './../../../assets/lottie/16895-carrot.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
