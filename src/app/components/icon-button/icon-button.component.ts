import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [],
  template: `
    <button
      [disabled]="disabled"
      [type]="type"
      (click)="handleClick()"
      class="{{
        tailwindColorClass
      }} border-2 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-2xl md:text-3xl disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-200"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class IconButtonComponent {
  @Input() color: string = 'green';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() onClick = new EventEmitter<void>();
  tailwindColorClass: string = '';

  ngOnInit() {
    switch (this.color) {
      case 'green':
        this.tailwindColorClass =
          'text-green-500 hover:border-green-500 hover:bg-green-500 hover:text-white';
        break;
      case 'red':
        this.tailwindColorClass =
          'text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white';
        break;
      case 'blue':
        this.tailwindColorClass =
          'text-blue-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white';
        break;
      default:
        throw new Error(`Unsupported color: ${this.color}`);
    }
  }

  handleClick() {
    this.onClick.emit();
  }
}
