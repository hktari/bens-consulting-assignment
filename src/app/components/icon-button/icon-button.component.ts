import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [],

  template: `
    <button
      (click)="handleClick()"
      class="{{
        tailwindColorClass
      }} border-2 flex items-center justify-center w-10 h-10 text-2xl"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class IconButtonComponent {
  @Input() color: string = 'green';
  @Output() onClick = new EventEmitter<void>();

  tailwindColorClass: string = '';

  constructor() {}

  ngOnInit() {
    switch (this.color) {
      case 'green':
        this.tailwindColorClass =
          'text-green-500 hover:border-green-500 hover:bg-green-500 hover:text-green-950';
        break;
      case 'red':
        this.tailwindColorClass =
          'text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-red-950';
        break;
      default:
        throw new Error(`Unsupported color: ${this.color}`);
    }
  }

  handleClick() {
    this.onClick.emit();
  }
}
