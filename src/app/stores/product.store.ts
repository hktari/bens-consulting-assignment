import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Product, ProductId } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  private products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.products();
  }

  fetchSingleProduct(id: ProductId) {
    return this.http.get<Product>('http://localhost:3000/products/' + id);
  }

  fetchProducts() {
    this.http
      .get<Product[]>('http://localhost:3000/products')
      .subscribe((data) => this.products.set(data));
  }

  addProduct(product: Product) {
    this.http
      .post<Product>('http://localhost:3000/products', product)
      .subscribe((newProduct) =>
        this.products.update((products) => [...products, newProduct])
      );
  }

  updateProduct(product: Product) {
    this.http
      .put<Product>(`http://localhost:3000/products/${product.id}`, product)
      .subscribe((updatedProduct) =>
        this.products.update((products) =>
          products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        )
      );
  }

  deleteProduct(id: ProductId) {
    this.http
      .delete(`http://localhost:3000/products/${id}`)
      .subscribe(() =>
        this.products.update((products) => products.filter((p) => p.id !== id))
      );
  }
}
