// this is ai generated, coinpaprika's js library did not bother to add typescript support

/**
 * Coinpaprika API types for ticker endpoint
 * Free tier - excludes circulating_supply field
 */

export interface Quote {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number | null;
  ath_date: string | null;
  percent_from_price_ath: number | null;
}

export interface Quotes {
  [currency: string]: Quote;
}

/**
 * Price data interface for Coinpaprika API (Free tier)
 * Note: circulating_supply is not available in the free plan
 */
export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  // circulating_supply: number; // Not available in free tier
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: Quotes;
}

/**
 * Error response interfaces
 */
export interface CoinpaprikaError {
  error: string;
}

export interface IdNotFoundError extends CoinpaprikaError {
  error: "id not found";
}

export interface TooManyRequestsError extends CoinpaprikaError {
  error: "you have reached maximum request limit";
}

/**
 * Supported quote currencies for the free tier
 */
export type SupportedCurrency =
  | "BTC"
  | "ETH"
  | "USD"
  | "EUR"
  | "PLN"
  | "KRW"
  | "GBP"
  | "CAD"
  | "JPY"
  | "RUB"
  | "TRY"
  | "NZD"
  | "AUD"
  | "CHF"
  | "UAH"
  | "HKD"
  | "SGD"
  | "NGN"
  | "PHP"
  | "MXN"
  | "BRL"
  | "THB"
  | "CLP"
  | "CNY"
  | "CZK"
  | "DKK"
  | "HUF"
  | "IDR"
  | "ILS"
  | "INR"
  | "MYR"
  | "NOK"
  | "PKR"
  | "SEK"
  | "TWD"
  | "ZAR"
  | "VND"
  | "BOB"
  | "COP"
  | "PEN"
  | "ARS"
  | "ISK";
