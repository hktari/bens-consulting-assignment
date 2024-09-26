import { Component } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, ProductsComponent],
  selector: 'app-root',
  template: `
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto">
        <a routerLink="/products" class="text-white font-bold"
          >Product Management</a
        >
      </div>
    </nav>
    <div class="container mx-auto p-4">
      <app-products></app-products>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
