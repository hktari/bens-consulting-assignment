import { Component, OnInit } from '@angular/core';
import { ProductStore } from '../../stores/product.store';
import { Product, ProductId } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';

@Component({
  standalone: true,
  imports: [RouterLink, ProductListItemComponent],
  selector: 'app-products',
  template: `
    <div class="container mx-auto p-10">
      <h1 class="text-4xl font-bold mb-4">Products</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="p-4">
          @for (product of productStore.getProducts(); track product.id) {
          <app-product-list-item
            [product]="product"
            (delete)="deleteProduct($event)"
          ></app-product-list-item>
          } @if(productStore.getProducts().length === 0){
          <div class="text-center text-gray-500">No products found</div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  constructor(public productStore: ProductStore) {}

  ngOnInit() {
    this.productStore.fetchProducts();
  }

  deleteProduct(id: ProductId) {
    this.productStore.deleteProduct(id);
  }
}
