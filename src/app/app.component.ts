import { Component } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from './logo/logo.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, ProductsComponent, LogoComponent],
  selector: 'app-root',
  template: `
    <nav class="bg-gray-200 p-4">
      <div class="container mx-auto">
        <app-logo></app-logo>
      </div>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  logoUrl = '/assets/images/logo.svg';
}
