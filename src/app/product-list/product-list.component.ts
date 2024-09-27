import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductListItemComponent } from '../components/product-list-item/product-list-item.component';
import { Product, ProductId } from '../models/product.model';
import { ProductStore } from '../stores/product.store';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterLink,
    ProductListItemComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  selector: 'app-product-list',
  template: `
    <div class="container max-w-screen-md mx-auto">
      <h1 class="text-4xl font-bold mb-4">Products</h1>

      <form [formGroup]="filterForm">
        <div class="mb-4">
          <input
            type="text"
            placeholder="Search by name or creator"
            class="p-2 border rounded w-full"
            formControlName="search"
          />
        </div>
        <div class="mb-4">
          <select class="p-2 border rounded w-full" formControlName="language">
            <option value="">All Languages</option>
            <option *ngFor="let lang of languages" [value]="lang">
              {{ lang }}
            </option>
          </select>
        </div>
      </form>
      <div class="space-y-20">
        <app-product-list-item
          *ngFor="let product of filteredProducts"
          [product]="product"
          (delete)="deleteProduct($event)"
        ></app-product-list-item>
      </div>
      <div
        *ngIf="filteredProducts.length === 0"
        class="text-center text-gray-500"
      >
        No products found
      </div>
    </div>
  `,
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  languages: string[] = [];
  filterForm: FormGroup;

  constructor(private productStore: ProductStore, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      search: [''],
      language: [''],
    });
  }

  ngOnInit() {
    this.productStore.fetchProducts();
    this.productStore.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });

    this.productStore.fetchFilterOptions().subscribe(({ uniqueLanguages }) => {
      this.languages = uniqueLanguages;
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyFilters();
    });
  }

  deleteProduct(id: ProductId) {
    this.productStore.deleteProduct(id);
  }

  applyFilters() {
    const { search, language } = this.filterForm.value;
    this.filteredProducts = this.products.filter((product) => {
      const matchesSearch =
        product.product_name.toLowerCase().includes(search.toLowerCase()) ||
        product.created_by.toLowerCase().includes(search.toLowerCase());
      const matchesLanguage =
        !language ||
        (product.languages && product.languages.includes(language));
      return matchesSearch && matchesLanguage;
    });
  }
}
