import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [NgOptimizedImage],
  template: `<img
    [ngSrc]="logoUrl"
    height="58"
    width="200"
    alt="bens consulting logo"
    priority
  />`,
})
export class LogoComponent {
  logoUrl = '/assets/img/bens-logo.png';
}
