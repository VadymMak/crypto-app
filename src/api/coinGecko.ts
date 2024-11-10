// src/api/coinGecko.ts
import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

export type CryptoData = {
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
};

export const getTopCryptos = async (
  limit: number | undefined,
  page: number | undefined,
  userPriceLimit: number
): Promise<{ data: CryptoData[]; totalItems: number }> => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: limit, // Number of items per page
        page: page, // Current page number
      },
    });

    // Filter data based on price limit
    const filteredData = response.data.filter(
      (coin: CryptoData) => coin.current_price <= userPriceLimit
    );

    // Assume the total number of items for pagination purposes, you can modify this as needed
    const totalItems = 1000; // This might need to be dynamic if the API gives the total number of items.

    return { data: filteredData, totalItems };
  } catch (error) {
    console.error("Error fetching crypto data", error);
    throw error;
  }
};
