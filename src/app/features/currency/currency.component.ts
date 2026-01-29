import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyService } from '../../core/services/currency.service';
import { HistoryService } from '../../core/services/history.service';
import { Currency } from '../../core/models';
import { 
  ValueInputComponent, 
  UnitSelectorComponent, 
  SwapButtonComponent,
  ResultDisplayComponent 
} from '../../shared/components';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [
    CommonModule, 
    ValueInputComponent, 
    UnitSelectorComponent, 
    SwapButtonComponent,
    ResultDisplayComponent
  ],
  templateUrl: './currency.component.html'
})
export class CurrencyComponent implements OnInit {
  currencies: Currency[] = [];
  
  fromCurrency: string = 'USD';
  toCurrency: string = 'BRL';
  inputValue: number = 1;
  outputValue: number = 0;
  
  currentRate: number = 0;
  loading: boolean = false;
  lastUpdate: Date | null = null;

  constructor(
    private currencyService: CurrencyService,
    private historyService: HistoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCurrencies();
    setTimeout(() => this.convert(), 150);
  }

  private async loadCurrencies(): Promise<void> {
    // Aguardar um pouco para o serviço carregar os dados
    await new Promise(resolve => setTimeout(resolve, 100));
    this.currencies = this.currencyService.getCurrencies();
    this.cdr.detectChanges();
  }

  get fromCurrencyData(): Currency | undefined {
    return this.currencyService.getCurrencyByCode(this.fromCurrency);
  }

  get toCurrencyData(): Currency | undefined {
    return this.currencyService.getCurrencyByCode(this.toCurrency);
  }

  get currencyOptions() {
    return this.currencies.map(c => ({
      code: c.code,
      name: c.name,
      symbol: c.symbol,
      flag: c.flag
    }));
  }

  onFromCurrencyChange(code: string): void {
    this.fromCurrency = code;
    this.convert();
  }

  onToCurrencyChange(code: string): void {
    this.toCurrency = code;
    this.convert();
  }

  onValueChange(value: number): void {
    this.inputValue = value;
    this.convert();
  }

  swap(): void {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
    this.convert();
  }

  convert(): void {
    if (this.inputValue <= 0) {
      this.outputValue = 0;
      return;
    }

    this.loading = true;

    this.currencyService.convert(this.inputValue, this.fromCurrency, this.toCurrency)
      .subscribe({
        next: (result) => {
          this.outputValue = result;
          this.loading = false;
          
          // Calcular taxa
          this.currencyService.getRate(this.fromCurrency, this.toCurrency)
            .subscribe(rate => {
              this.currentRate = rate;
              this.cdr.detectChanges();
            });
          
          // Salvar no histórico
          this.historyService.add({
            type: 'currency',
            fromCode: this.fromCurrency,
            toCode: this.toCurrency,
            fromValue: this.inputValue,
            toValue: result
          });

          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Erro na conversão:', err);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });

    // Atualizar última atualização
    this.currencyService.getLastUpdate$()
      .subscribe(date => {
        this.lastUpdate = date;
        this.cdr.detectChanges();
      });
  }

  formatRate(): string {
    if (!this.currentRate) return '';
    return `1 ${this.fromCurrency} = ${this.currentRate.toFixed(4)} ${this.toCurrency}`;
  }

  formatLastUpdate(): string {
    if (!this.lastUpdate) return '';
    
    const now = new Date();
    const diff = now.getTime() - this.lastUpdate.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Atualizado agora';
    if (minutes === 1) return 'Atualizado há 1 minuto';
    if (minutes < 60) return `Atualizado há ${minutes} minutos`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return 'Atualizado há 1 hora';
    return `Atualizado há ${hours} horas`;
  }
}