import axios from "axios";

//Your API key is: 5de799602a294585a294ead9f203e5cc

const NEWS_API_URL = "https://newsapi.org/v2/everything";
const API_KEY = "5de799602a294585a294ead9f203e5cc"; // Get an API key from https://newsapi.org/

export const getInvestorNews = async (query: string) => {
  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: query, // search query for investors or crypto news
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news from NewsAPI", error);
    throw error;
  }
};
