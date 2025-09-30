import { open } from "lmdb";
import type { DatabaseRecord, PriceChangeRecord } from "../types/db";

const db = open({
  path: "./db",
});

export class Database {
  // price
  static async getPrice(): Promise<DatabaseRecord<number> | null> {
    return db.get("price");
  }
  static async setPrice(price: number): Promise<void> {
    const record: DatabaseRecord<number> = {
      value: price,
      lastUpdated: Date.now(),
    };
    await db.put("price", record);
  }
  // market cap
  static async getMarketCap(): Promise<DatabaseRecord<number> | null> {
    return db.get("marketCap");
  }
  static async setMarketCap(marketCap: number): Promise<void> {
    const record: DatabaseRecord<number> = {
      value: marketCap,
      lastUpdated: Date.now(),
    };
    await db.put("marketCap", record);
  }
  // volume
  static async getVolume(): Promise<DatabaseRecord<number> | null> {
    return db.get("volume");
  }
  static async setVolume(volume: number): Promise<void> {
    const record: DatabaseRecord<number> = {
      value: volume,
      lastUpdated: Date.now(),
    };
    await db.put("volume", record);
  }

  // price change
  static async getPriceChange(): Promise<DatabaseRecord<PriceChangeRecord> | null> {
    return db.get("priceChange");
  }
  static async setPriceChange(priceChange: PriceChangeRecord): Promise<void> {
    const record: DatabaseRecord<PriceChangeRecord> = {
      value: priceChange,
      lastUpdated: Date.now(),
    };
    await db.put("priceChange", record);
  }
}

export default db;
