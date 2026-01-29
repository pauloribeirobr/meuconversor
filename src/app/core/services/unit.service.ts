import { Injectable } from '@angular/core';
import { Unit, UnitCategory } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private units: Map<UnitCategory, Unit[]> = new Map();

  constructor() {
    this.loadUnits();
  }

  private async loadUnits(): Promise<void> {
    try {
      // Carregar cada categoria
      const lengthResponse = await fetch('/assets/data/length-units.json');
      const lengthUnits: Unit[] = await lengthResponse.json();
      this.units.set('length', lengthUnits);

      const weightResponse = await fetch('/assets/data/weight-units.json');
      const weightUnits: Unit[] = await weightResponse.json();
      this.units.set('weight', weightUnits);

      const volumeResponse = await fetch('/assets/data/volume-units.json');
      const volumeUnits: Unit[] = await volumeResponse.json();
      this.units.set('volume', volumeUnits);

      const tempResponse = await fetch('/assets/data/temperature-units.json');
      const tempUnits: Unit[] = await tempResponse.json();
      this.units.set('temperature', tempUnits);

    } catch (error) {
      console.error('Erro ao carregar unidades:', error);
    }
  }

  // Retorna unidades de uma categoria
  getUnitsByCategory(category: UnitCategory): Unit[] {
    return this.units.get(category) || [];
  }

  // Busca unidade por ID
  getUnitById(category: UnitCategory, id: string): Unit | undefined {
    const units = this.units.get(category);
    return units?.find(u => u.id === id);
  }

  // Conversão de unidades (exceto temperatura)
  convert(value: number, from: Unit, to: Unit): number {
    if (from.category !== to.category) {
      throw new Error('Não é possível converter entre categorias diferentes');
    }

    // Temperatura tem lógica especial
    if (from.category === 'temperature') {
      return this.convertTemperature(value, from.id, to.id);
    }

    // Para outras unidades: converte para base e depois para destino
    const valueInBase = value * from.toBase;
    return valueInBase / to.toBase;
  }

  // Conversão de temperatura
  private convertTemperature(value: number, fromId: string, toId: string): number {
    // Primeiro converte para Celsius
    let celsius: number;
    
    switch (fromId) {
      case 'celsius':
        celsius = value;
        break;
      case 'fahrenheit':
        celsius = (value - 32) * 5 / 9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    // Depois converte de Celsius para o destino
    switch (toId) {
      case 'celsius':
        return celsius;
      case 'fahrenheit':
        return (celsius * 9 / 5) + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        return celsius;
    }
  }

  // Retorna todas as categorias disponíveis
  getCategories(): UnitCategory[] {
    return ['length', 'weight', 'volume', 'temperature'];
  }

  // Retorna nome amigável da categoria
  getCategoryName(category: UnitCategory): string {
    const names: Record<UnitCategory, string> = {
      'length': 'Comprimento',
      'weight': 'Peso',
      'volume': 'Volume',
      'temperature': 'Temperatura'
    };
    return names[category];
  }
}