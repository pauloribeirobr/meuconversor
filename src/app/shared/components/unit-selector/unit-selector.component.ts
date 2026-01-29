import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SelectorOption {
  code: string;
  name: string;
  symbol?: string;
  flag?: string;
}

@Component({
  selector: 'app-unit-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit-selector.component.html'
})
export class UnitSelectorComponent {
  @Input() options: SelectorOption[] = [];
  @Input() selected: string = '';
  @Input() placeholder: string = 'Selecione...';
  @Input() searchable: boolean = true;
  
  @Output() selectedChange = new EventEmitter<string>();

  isOpen: boolean = false;
  searchTerm: string = '';

  get filteredOptions(): SelectorOption[] {
    if (!this.searchTerm) return this.options;
    
    const term = this.searchTerm.toLowerCase();
    return this.options.filter(opt => 
      opt.name.toLowerCase().includes(term) || 
      opt.code.toLowerCase().includes(term)
    );
  }

  get selectedOption(): SelectorOption | undefined {
    return this.options.find(opt => opt.code === this.selected);
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.searchTerm = '';
    }
  }

  close(): void {
    this.isOpen = false;
    this.searchTerm = '';
  }

  select(option: SelectorOption): void {
    this.selected = option.code;
    this.selectedChange.emit(option.code);
    this.close();
  }

  onClickOutside(): void {
    this.close();
  }
}