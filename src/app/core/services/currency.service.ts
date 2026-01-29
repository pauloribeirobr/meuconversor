import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Currency, ExchangeRateResponse } from '../models';
import { CURRENCIES } from '../data/currencies';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private readonly API_URL = 'https://open.er-api.com/v6/latest';
  private readonly CACHE_KEY = 'meuconversor_rates';
  private readonly CACHE_DURATION = 60 * 60 * 1000; // 1 hora em ms
  
  private currencies: Currency[] = [];
  private rates$ = new BehaviorSubject<{ [key: string]: number } | null>(null);
  private lastUpdate$ = new BehaviorSubject<Date | null>(null);
  private loading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.currencies = CURRENCIES;
    this.loadCachedRates();
  }

  // Retorna todas as moedas
  getCurrencies(): Currency[] {
    return this.currencies;
  }

  // Retorna moedas por tier (para mostrar as populares primeiro)
  getCurrenciesByTier(tier: number): Currency[] {
    return this.currencies.filter(c => c.tier === tier);
  }

  // Busca uma moeda pelo código
  getCurrencyByCode(code: string): Currency | undefined {
    return this.currencies.find(c => c.code === code);
  }

  // Verifica se tem cache válido
  private loadCachedRates(): void {
    const cached = localStorage.getItem(this.CACHE_KEY);
    if (cached) {
      const { rates, timestamp } = JSON.parse(cached);
      const age = Date.now() - timestamp;
      
      if (age < this.CACHE_DURATION) {
        this.rates$.next(rates);
        this.lastUpdate$.next(new Date(timestamp));
      }
    }
  }

  // Salva no cache
  private saveToCache(rates: { [key: string]: number }): void {
    const data = {
      rates,
      timestamp: Date.now()
    };
    localStorage.setItem(this.CACHE_KEY, JSON.stringify(data));
  }

  // Busca cotações da API (sempre em USD)
  fetchRates(): Observable<{ [key: string]: number }> {
    // Se já tem cache válido, retorna do cache
    const cached = this.rates$.getValue();
    if (cached) {
      return of(cached);
    }

    this.loading$.next(true);

    return this.http.get<ExchangeRateResponse>(this.API_URL).pipe(
      map(response => response.rates),
      tap(rates => {
        this.rates$.next(rates);
        this.lastUpdate$.next(new Date());
        this.saveToCache(rates);
        this.loading$.next(false);
      }),
      catchError(error => {
        console.error('Erro ao buscar cotações:', error);
        this.loading$.next(false);
        throw error;
      })
    );
  }

  // Converte valor entre duas moedas
  convert(amount: number, from: string, to: string): Observable<number> {
    return this.fetchRates().pipe(
      map(rates => {
        const rate = rates[to] / rates[from];
        if (!rate || !isFinite(rate)) {
          throw new Error(`Taxa não encontrada para ${from} -> ${to}`);
        }
        return amount * rate;
      })
    );
  }

  // Retorna a taxa de conversão
  getRate(from: string, to: string): Observable<number> {
    return this.fetchRates().pipe(
      map(rates => {
        const rate = rates[to] / rates[from];
        return rate || 0;
      })
    );
  }

  // Observables públicos
  getRates$(): Observable<{ [key: string]: number } | null> {
    return this.rates$.asObservable();
  }

  getLastUpdate$(): Observable<Date | null> {
    return this.lastUpdate$.asObservable();
  }

  isLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  // Força atualização (ignora cache)
  forceRefresh(): Observable<{ [key: string]: number }> {
    localStorage.removeItem(this.CACHE_KEY);
    this.rates$.next(null);
    return this.fetchRates();
  }
}