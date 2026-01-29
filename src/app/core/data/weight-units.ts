import { Unit } from '../models';

export const WEIGHT_UNITS: Unit[] = [
  { "id": "milligram", "name": "Miligrama", "symbol": "mg", "category": "weight", "toBase": 0.001 },
  { "id": "gram", "name": "Grama", "symbol": "g", "category": "weight", "toBase": 1 },
  { "id": "kilogram", "name": "Quilograma", "symbol": "kg", "category": "weight", "toBase": 1000 },
  { "id": "ton", "name": "Tonelada", "symbol": "t", "category": "weight", "toBase": 1000000 },
  { "id": "ounce", "name": "Onça", "symbol": "oz", "category": "weight", "toBase": 28.3495 },
  { "id": "pound", "name": "Libra", "symbol": "lb", "category": "weight", "toBase": 453.592 }
];