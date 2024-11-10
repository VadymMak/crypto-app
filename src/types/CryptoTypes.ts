// src/types/crypto.ts
export interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  image: string;
  [key: string]: any; // Extendable if API adds fields
}
