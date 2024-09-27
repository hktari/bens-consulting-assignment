import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [LogoComponent],
  template: `<nav class="bg-gray-200 p-4 py-8">
    <div class="container max-w-screen-md mx-auto">
      <app-logo></app-logo>
    </div>
  </nav>`,
})
export class NavComponent {
  logoUrl = '/assets/images/logo.svg';
}
