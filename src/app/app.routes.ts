import { Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

export const routes: Routes = [
  { path: 'product/:id', component: ProductDetailComponent },
];
