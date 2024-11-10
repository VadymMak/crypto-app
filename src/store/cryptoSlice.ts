// src/store/cryptoSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CryptoState {
  currentPage: number;
  totalPages: number;
  priceLimit: number;
}

const initialState: CryptoState = {
  currentPage: 1,
  totalPages: 10,
  priceLimit: 1,
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
  },
});

export const { setCurrentPage, setTotalPages, setPriceLimit } =
  cryptoSlice.actions;
export default cryptoSlice.reducer;
