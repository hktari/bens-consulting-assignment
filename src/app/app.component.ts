import { Component } from '@angular/core';
import { ProductsComponent } from './components/products/products.component';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, ProductsComponent, NavComponent],
  selector: 'app-root',
  template: `
    <app-nav></app-nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {}
