import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductStore } from '../../stores/product.store';
import { Product } from '../../models/product.model';

@Component({
  standalone: true,

  selector: 'app-product-detail',
  template: `
    <div class="container mx-auto p-4" *ngIf="product">
      <h1 class="text-2xl font-bold mb-4">{{ product?.name }}</h1>
      <p class="mb-2">Price: {{ product?.price }}</p>
      <p>{{ product?.description }}</p>
    </div>
  `,
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productStore: ProductStore
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // TODO: Implement fetching product by id
    // this.product = await this.productStore.getProducts().find((p) => p.id === id);
  }
}
