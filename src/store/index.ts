// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from "./cryptoSlice";

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Define the RootState type

export default store;
