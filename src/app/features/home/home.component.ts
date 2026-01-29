import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ConverterCard {
  icon: string;
  title: string;
  description: string;
  route: string;
  color: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  converters: ConverterCard[] = [
    {
      icon: '💱',
      title: 'Moedas',
      description: 'Dólar, Euro, Real e mais 47 moedas',
      route: '/moedas',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: '📏',
      title: 'Comprimento',
      description: 'Metros, pés, polegadas, milhas',
      route: '/comprimento',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: '⚖️',
      title: 'Peso',
      description: 'Quilos, libras, onças, gramas',
      route: '/peso',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: '🌡️',
      title: 'Temperatura',
      description: 'Celsius, Fahrenheit, Kelvin',
      route: '/temperatura',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: '🥄',
      title: 'Volume',
      description: 'Litros, xícaras, colheres, ml',
      route: '/volume',
      color: 'from-amber-400 to-amber-600'
    }
  ];
}