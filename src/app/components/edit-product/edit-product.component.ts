import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductStore } from '../../stores/product.store';
import { Product } from '../../models/product.model';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matSaveRound } from '@ng-icons/material-icons/round';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, NgIconComponent],
  viewProviders: [provideIcons({ matSaveRound })],
  selector: 'app-edit-product',
  template: `
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4">Edit Product</h2>
      <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700"
            >Name</label
          >
          <input
            type="text"
            id="name"
            formControlName="name"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label
            for="description"
            class="block text-sm font-medium text-gray-700"
            >Description</label
          >
          <textarea
            id="description"
            formControlName="description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border font-medium  text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-2xl"
            [disabled]="!productForm.valid"
          >
            <ng-icon name="matSaveRound"></ng-icon>
          </button>
        </div>
      </form>
    </div>
  `,
})
export class EditProductComponent implements OnInit {
  @Input() product: Product | undefined;
  @Output() saveComplete = new EventEmitter<void>();
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productStore: ProductStore
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: [this.product?.product_name, Validators.required],
      description: [this.product?.description, Validators.required],
    });
  }

  onSubmit() {
    if (this.productForm.valid && this.product) {
      const updatedProduct: Product = {
        ...this.product,
        product_name: this.productForm.value.name,
        description: this.productForm.value.description,
      };
      this.productStore.updateProduct(updatedProduct);
      this.saveComplete.emit();
    }
  }
}
