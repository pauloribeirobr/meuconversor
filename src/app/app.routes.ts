import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component')
      .then(m => m.HomeComponent),
    title: 'MeuConversor - Converta moedas, medidas e unidades'
  },
  {
    path: 'moedas',
    loadComponent: () => import('./features/currency/currency.component')
      .then(m => m.CurrencyComponent),
    title: 'Conversor de Moedas | MeuConversor'
  },
  {
    path: 'comprimento',
    loadComponent: () => import('./features/length/length.component')
      .then(m => m.LengthComponent),
    title: 'Conversor de Comprimento | MeuConversor'
  },
  {
    path: 'peso',
    loadComponent: () => import('./features/weight/weight.component')
      .then(m => m.WeightComponent),
    title: 'Conversor de Peso | MeuConversor'
  },
  {
    path: 'temperatura',
    loadComponent: () => import('./features/temperature/temperature.component')
      .then(m => m.TemperatureComponent),
    title: 'Conversor de Temperatura | MeuConversor'
  },
  {
    path: 'volume',
    loadComponent: () => import('./features/volume/volume.component')
      .then(m => m.VolumeComponent),
    title: 'Conversor de Volume | MeuConversor'
  },
  {
    path: 'sobre',
    loadComponent: () => import('./features/about/about.component')
      .then(m => m.AboutComponent),
    title: 'Sobre | MeuConversor'
  },
  {
    path: 'privacidade',
    loadComponent: () => import('./features/privacy/privacy.component')
      .then(m => m.PrivacyComponent),
    title: 'Política de Privacidade | MeuConversor'
  },
  {
    path: 'termos',
    loadComponent: () => import('./features/terms/terms.component')
      .then(m => m.TermsComponent),
    title: 'Termos de Uso | MeuConversor'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
