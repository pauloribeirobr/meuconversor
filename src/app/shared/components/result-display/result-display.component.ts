import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-display.component.html'
})
export class ResultDisplayComponent {
  @Input() value: number = 0;
  @Input() symbol: string = '';
  @Input() unitName: string = '';
  @Input() loading: boolean = false;

  copied: boolean = false;

  get formattedValue(): string {
    if (this.value === 0) return '0';
    
    // Para valores muito grandes ou muito pequenos, usa notação apropriada
    if (this.value >= 1000000) {
      return this.value.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
    }
    
    if (this.value < 0.01 && this.value > 0) {
      return this.value.toFixed(6);
    }
    
    return this.value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    });
  }

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.value.toString());
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  }

  async share(): Promise<void> {
    const text = `${this.formattedValue} ${this.symbol}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MeuConversor',
          text: text,
          url: window.location.href
        });
      } catch (err) {
        // Usuário cancelou ou erro
        console.log('Compartilhamento cancelado');
      }
    } else {
      // Fallback: copia para área de transferência
      this.copyToClipboard();
    }
  }
}