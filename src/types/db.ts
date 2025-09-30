export interface DatabaseRecord<T> {
  value: T;
  lastUpdated: number;
}

export interface PriceChangeRecord {
  hour: number;
  day: number;
  week: number;
}
