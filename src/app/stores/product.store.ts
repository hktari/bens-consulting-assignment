import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { Product, ProductId } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  private products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  _appendToBaseURL(url: string) {
    return new URL(url, environment.apiUrl).toString();
  }

  getProducts() {
    return this.products();
  }

  fetchSingleProduct(id: ProductId) {
    return this.http.get<Product>(this._appendToBaseURL(`/products/${id}`));
  }

  fetchProducts() {
    this.http
      .get<Product[]>(this._appendToBaseURL('/products'))
      .subscribe((data) => this.products.set(data));
  }

  addProduct(product: Product) {
    this.http
      .post<Product>(this._appendToBaseURL('/products'), product)
      .subscribe((newProduct) =>
        this.products.update((products) => [...products, newProduct])
      );
  }

  updateProduct(product: Product) {
    this.http
      .put<Product>(this._appendToBaseURL(`products/${product.id}`), product)
      .subscribe((updatedProduct) =>
        this.products.update((products) =>
          products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        )
      );
  }

  deleteProduct(id: ProductId) {
    this.http
      .delete(this._appendToBaseURL(`products/${id}`))
      .subscribe(() =>
        this.products.update((products) => products.filter((p) => p.id !== id))
      );
  }
}
