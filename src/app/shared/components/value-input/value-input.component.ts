import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-value-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './value-input.component.html'
})
export class ValueInputComponent {
  @Input() value: number = 0;
  @Input() prefix: string = '';
  @Input() placeholder: string = 'Digite um valor';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  
  @Output() valueChange = new EventEmitter<number>();
  @Output() onClear = new EventEmitter<void>();

  displayValue: string = '';

  ngOnInit() {
    this.displayValue = this.value ? this.formatNumber(this.value) : '';
  }

  ngOnChanges() {
    if (this.readonly) {
      this.displayValue = this.value ? this.formatNumber(this.value) : '';
    }
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let rawValue = input.value;
    
    // Remove tudo exceto números, vírgula e ponto
    rawValue = rawValue.replace(/[^\d.,]/g, '');
    
    // Substitui vírgula por ponto para parsing
    const numericValue = parseFloat(rawValue.replace(',', '.')) || 0;
    
    this.displayValue = rawValue;
    this.valueChange.emit(numericValue);
  }

  clear(): void {
    this.displayValue = '';
    this.valueChange.emit(0);
    this.onClear.emit();
  }

  increment(): void {
    const currentValue = parseFloat(this.displayValue.replace(',', '.')) || 0;
    const newValue = currentValue + 1;
    this.setValue(newValue);
  }

  decrement(): void {
    const currentValue = parseFloat(this.displayValue.replace(',', '.')) || 0;
    const newValue = Math.max(0, currentValue - 1);
    this.setValue(newValue);
  }

  private setValue(value: number): void {
    this.displayValue = this.formatNumber(value);
    this.valueChange.emit(value);
  }

  private formatNumber(value: number): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    });
  }
}