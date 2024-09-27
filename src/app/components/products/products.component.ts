import { Component, OnInit } from '@angular/core';
import { ProductStore } from '../../stores/product.store';
import { Product, ProductId } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import { ProductListComponent } from '../../product-list/product-list.component';

@Component({
  standalone: true,
  imports: [RouterLink, ProductListItemComponent, ProductListComponent],
  selector: 'app-products',
  template: `
    <div class="container mx-auto p-3 pt-5 md:p-10">
      <app-product-list />
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
