export interface HistoryItem {
    id: string;
    type: 'currency' | 'unit';
    fromCode: string;
    toCode: string;
    fromValue: number;
    toValue: number;
    timestamp: Date;
}