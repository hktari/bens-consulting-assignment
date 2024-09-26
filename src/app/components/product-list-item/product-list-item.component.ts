import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product, ProductId } from '../../models/product.model';
import { RouterLink } from '@angular/router';
import { EditProductComponent } from '../edit-product/edit-product.component';
import {
  matDeleteOutline,
  matModeEditOutlineOutline,
} from '@ng-icons/material-icons/outline';
import { IconButtonComponent } from '../icon-button/icon-button.component';
@Component({
  standalone: true,
  imports: [
    RouterLink,
    EditProductComponent,
    NgIconComponent,
    IconButtonComponent,
  ],
  selector: 'app-product-list-item',
  viewProviders: [
    provideIcons({ matDeleteOutline, matModeEditOutlineOutline }),
  ],
  template: `
    <div class="border rounded">
      @if(!isEditing){
      <a [routerLink]="['/product', product.id]" class="p-4 flex items-center">
        <h2 class="text-xl font-semibold flex-grow">
          {{ product.product_name }}
        </h2>
        <div class="mt-2 grid gap-3 grid-rows-1 grid-cols-2">
          <app-icon-button (onClick)="onEdit()" color="green">
            <ng-icon name="matModeEditOutlineOutline"></ng-icon>
          </app-icon-button>

          <app-icon-button (onClick)="onDelete()" color="red">
            <ng-icon name="matDeleteOutline"></ng-icon>
          </app-icon-button>
        </div>
      </a>
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
  @Output() delete = new EventEmitter<ProductId>();

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
