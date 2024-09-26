import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [],

  template: `
    <button
      (click)="onClick()"
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
  @Input() icon!: NgIconComponent;
  @Input() onClick: () => void = () => {};

  tailwindColorClass: string = '';

  constructor() {
    this.onClick = this.onClick.bind(this);
  }

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
}
