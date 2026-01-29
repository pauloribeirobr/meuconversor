import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HistoryItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private readonly STORAGE_KEY = 'meuconversor_history';
  private readonly MAX_ITEMS = 20;
  
  private history$ = new BehaviorSubject<HistoryItem[]>([]);

  constructor() {
    this.loadFromStorage();
  }

  // Carrega histórico do localStorage
  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const items = JSON.parse(stored);
        // Converter strings de data para objetos Date
        const parsed = items.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        this.history$.next(parsed);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
        this.history$.next([]);
      }
    }
  }

  // Salva no localStorage
  private saveToStorage(items: HistoryItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  // Adiciona item ao histórico
  add(item: Omit<HistoryItem, 'id' | 'timestamp'>): void {
    const newItem: HistoryItem = {
      ...item,
      id: this.generateId(),
      timestamp: new Date()
    };

    const current = this.history$.getValue();
    
    // Remove duplicatas (mesma conversão)
    const filtered = current.filter(
      h => !(h.fromCode === item.fromCode && h.toCode === item.toCode && h.type === item.type)
    );

    // Adiciona no início e limita quantidade
    const updated = [newItem, ...filtered].slice(0, this.MAX_ITEMS);
    
    this.history$.next(updated);
    this.saveToStorage(updated);
  }

  // Retorna o histórico como Observable
  getHistory$(): Observable<HistoryItem[]> {
    return this.history$.asObservable();
  }

  // Retorna o histórico atual
  getHistory(): HistoryItem[] {
    return this.history$.getValue();
  }

  // Limpa o histórico
  clear(): void {
    this.history$.next([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Remove item específico
  remove(id: string): void {
    const current = this.history$.getValue();
    const updated = current.filter(h => h.id !== id);
    this.history$.next(updated);
    this.saveToStorage(updated);
  }

  // Gera ID único
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}