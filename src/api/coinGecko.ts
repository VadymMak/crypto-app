import axios from "axios";
import { AxiosError } from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTopCryptos = async (
  limit: number,
  page: number,
  userPriceLimit: number
): Promise<any> => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: limit,
        page: page,
      },
    });

    const remainingRequests = response.headers["x-ratelimit-remaining"];
    console.log("Remaining requests: ", remainingRequests);

    if (remainingRequests === "0") {
      console.log("Rate limit reached, waiting for reset...");
      const resetTime = parseInt(response.headers["x-ratelimit-reset"], 10);
      const currentTime = Math.floor(Date.now() / 1000);
      const waitTime = (resetTime - currentTime) * 1000;
      console.log(`Waiting for ${waitTime / 1000} seconds...`);
      await delay(waitTime);

      return await getTopCryptos(limit, page, userPriceLimit);
    }

    console.log("Data from response: ", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      console.error("Error fetching crypto data: ", axiosError.response?.data);
      console.error("Status: ", axiosError.response?.status);
      console.error("Headers: ", axiosError.response?.headers);
    } else {
      console.error("Unexpected error: ", error);
    }
    throw error;
  }
};
