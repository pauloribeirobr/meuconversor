import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg 
      [attr.width]="sizeValue" 
      [attr.height]="sizeValue"
      viewBox="0 0 512 512" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#3B82F6"/>
          <stop offset="100%" stop-color="#1D4ED8"/>
        </linearGradient>
      </defs>
      
      <circle cx="256" cy="256" r="240" fill="url(#logoGradient)"/>
      
      <g stroke="white" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M140 190 L372 190"/>
        <path d="M320 140 L372 190 L320 240"/>
        <path d="M372 322 L140 322"/>
        <path d="M192 272 L140 322 L192 372"/>
      </g>
    </svg>
  `
})
export class LogoComponent {
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';

  get sizeValue(): number {
    const sizes = { sm: 32, md: 40, lg: 56, xl: 80 };
    return sizes[this.size];
  }
}