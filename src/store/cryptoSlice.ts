// src/store/cryptoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CryptoState {
  currentPage: number;
  totalPages: number;
  priceLimit: number;
  allCryptos: CryptoData[];
}

export type CryptoData = {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
};

const initialState: CryptoState = {
  currentPage: 1,
  totalPages: 10,
  priceLimit: 1, // Default price limit to 1 USD
  allCryptos: [], // Initialize with an empty array
};

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setPriceLimit(state, action: PayloadAction<number>) {
      state.priceLimit = action.payload;
    },
    setAllCryptos(state, action: PayloadAction<CryptoData[]>) {
      state.allCryptos = action.payload; // Store initial set of cryptos
    },
    appendCryptos(state, action: PayloadAction<CryptoData[]>) {
      state.allCryptos = [...state.allCryptos, ...action.payload]; // Append new data
    },
  },
});

export const {
  setCurrentPage,
  setTotalPages,
  setPriceLimit,
  setAllCryptos,
  appendCryptos,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
