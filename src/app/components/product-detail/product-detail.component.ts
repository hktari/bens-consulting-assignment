import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductStore } from '../../stores/product.store';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';

@Component({
  standalone: true,

  selector: 'app-product-detail',
  template: `
    @if(product){
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">{{ product.product_name }}</h1>
      <p>{{ product.description }}</p>
    </div>
    }@else{
    <div class="container mx-auto p-4">
      <p>Product not found: {{ product }}</p>
    </div>
    }
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
    this.productStore
      .fetchSingleProduct(id)
      .subscribe((product) => (this.product = product));
  }
}
