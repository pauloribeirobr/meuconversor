export interface Unit {
    id: string;          // 'meter', 'kilometer', 'inch'...
    name: string;        // 'Metro', 'Quilômetro', 'Polegada'...
    symbol: string;      // 'm', 'km', 'in'...
    category: UnitCategory;
    toBase: number;      // fator de conversão para unidade base
}

export type UnitCategory = 'length' | 'weight' | 'volume' | 'temperature';

export interface UnitConversionResult {
    from: Unit;
    to: Unit;
    inputValue: number;
    outputValue: number;
    timestamp: Date;
}