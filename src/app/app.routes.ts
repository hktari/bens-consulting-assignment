import { Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

export const routes: Routes = [
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'edit-product/:id', component: EditProductComponent },
];
