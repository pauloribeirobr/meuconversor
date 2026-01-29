import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-swap-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      (click)="onClick()"
      class="p-3 bg-white border-2 border-gray-200 rounded-full shadow-sm
             hover:border-primary-500 hover:bg-primary-50 
             active:scale-95 transition-all duration-200
             focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      [class.rotate-180]="rotated"
      aria-label="Inverter conversão"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6 text-primary-600 transition-transform duration-300"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    </button>
  `
})
export class SwapButtonComponent {
  @Output() swap = new EventEmitter<void>();
  
  rotated: boolean = false;

  onClick(): void {
    this.rotated = !this.rotated;
    this.swap.emit();
  }
}