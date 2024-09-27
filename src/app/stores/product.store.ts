import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product, ProductId } from '../models/product.model';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductStore {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  private _appendToBaseURL(url: string): string {
    return new URL(url, environment.apiUrl).toString();
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  fetchSingleProduct(id: ProductId): Observable<Product> {
    return this.http.get<Product>(this._appendToBaseURL(`/products/${id}`));
  }

  fetchProducts(): void {
    this.http
      .get<Product[]>(this._appendToBaseURL('/products'))
      .pipe(tap((data) => this.productsSubject.next(data)))
      .subscribe();
  }

  addProduct(product: Product): void {
    this.http
      .post<Product>(this._appendToBaseURL('/products'), product)
      .pipe(
        tap((newProduct) =>
          this.productsSubject.next([...this.productsSubject.value, newProduct])
        )
      )
      .subscribe();
  }

  updateProduct(product: Product): void {
    this.http
      .put<Product>(this._appendToBaseURL(`products/${product.id}`), product)
      .pipe(
        tap((updatedProduct) =>
          this.productsSubject.next(
            this.productsSubject.value.map((p) =>
              p.id === updatedProduct.id ? updatedProduct : p
            )
          )
        )
      )
      .subscribe();
  }

  deleteProduct(id: ProductId): void {
    this.http
      .delete(this._appendToBaseURL(`products/${id}`))
      .pipe(
        tap(() =>
          this.productsSubject.next(
            this.productsSubject.value.filter((p) => p.id !== id)
          )
        )
      )
      .subscribe();
  }

  fetchFilterOptions(): Observable<{ uniqueLanguages: string[] }> {
    return this.http.get<{ uniqueLanguages: string[] }>(
      this._appendToBaseURL('/product-filters')
    );
  }
}
