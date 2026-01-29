import { Unit } from '../models';

export const VOLUME_UNITS: Unit[] = [
  { "id": "milliliter", "name": "Mililitro", "symbol": "ml", "category": "volume", "toBase": 1 },
  { "id": "liter", "name": "Litro", "symbol": "L", "category": "volume", "toBase": 1000 },
  { "id": "cup-br", "name": "Xícara (BR)", "symbol": "xíc", "category": "volume", "toBase": 240 },
  { "id": "tablespoon", "name": "Colher de sopa", "symbol": "cs", "category": "volume", "toBase": 15 },
  { "id": "teaspoon", "name": "Colher de chá", "symbol": "cch", "category": "volume", "toBase": 5 },
  { "id": "glass", "name": "Copo americano", "symbol": "copo", "category": "volume", "toBase": 200 },
  { "id": "fluid-ounce", "name": "Onça fluida", "symbol": "fl oz", "category": "volume", "toBase": 29.5735 },
  { "id": "gallon", "name": "Galão (US)", "symbol": "gal", "category": "volume", "toBase": 3785.41 }
];