import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  standalone: true,
  imports: [RouterLink, EditProductComponent],
  selector: 'app-product-list-item',
  template: `
    <div class="border p-4 rounded">
      @if(!isEditing){

      <h2 class="text-xl font-semibold">{{ product.name }}</h2>
      <p>Price: {{ product.price }}</p>
      <div class="mt-2">
        <a
          [routerLink]="['/product', product.id]"
          class="text-blue-500 hover:underline mr-2"
          >View</a
        >
        <button (click)="onEdit()" class="text-green-500 hover:underline mr-2">
          Edit
        </button>
        <button (click)="onDelete()" class="text-red-500 hover:underline">
          Delete
        </button>
      </div>
      }@else{
      <app-edit-product
        [product]="product"
        (saveComplete)="onSaveComplete()"
      ></app-edit-product>
      }
    </div>
  `,
})
export class ProductListItemComponent {
  @Input() product!: Product;
  @Output() delete = new EventEmitter<number>();

  isEditing = false;

  onEdit() {
    this.isEditing = true;
  }

  onDelete() {
    this.delete.emit(this.product.id);
  }

  onSaveComplete() {
    this.isEditing = false;
  }
}
