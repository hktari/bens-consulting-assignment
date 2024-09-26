import { Component, OnInit } from '@angular/core';
import { ProductStore } from '../../stores/product.store';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';

// TODO: move ProductItem into separate component
@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'app-products',
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Products</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="border p-4 rounded">
          @for (product of productStore.getProducts(); track product.id) { 
          <h2 class="text-xl font-semibold">{{ product?.name }}</h2>
          <p>Price: {{ product?.price }}</p>
          <div class="mt-2">
            <a
              [routerLink]="['/product', product?.id]"
              class="text-blue-500 hover:underline mr-2"
              >View</a
            >
            <button
              (click)="editProduct(product)"
              class="text-green-500 hover:underline mr-2"
            >
              Edit
            </button>
            <button
              (click)="deleteProduct(product?.id!)"
              class="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
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

  editProduct(product: Product) {
    // Implement edit functionality
  }

  deleteProduct(id: number) {
    this.productStore.deleteProduct(id);
  }
}
