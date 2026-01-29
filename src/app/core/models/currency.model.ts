export interface Currency {
    code: string;        // USD, EUR, BRL...
    name: string;        // Dólar Americano, Euro...
    symbol: string;      // $, €, R$...
    flag: string;        // 🇺🇸, 🇪🇺, 🇧🇷...
    tier: number;        // 1 = mais popular, 6 = menos
}

export interface ExchangeRateResponse {
    result: string;
    base_code: string;
    time_last_update_utc: string;
    time_next_update_utc: string;
    rates: { [key: string]: number };
}

export interface ConversionResult {
    from: Currency;
    to: Currency;
    inputValue: number;
    outputValue: number;
    rate: number;
    timestamp: Date;
}