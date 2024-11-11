export const getTopCryptos = async (
  limit: number,
  page: number,
  retries: number = 3
): Promise<any> => {
  try {
    const url = new URL("https://openapiv1.coinstats.app/coins");

    // Pagination with page and limit
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("page", page.toString()); // Page parameter instead of skip

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        accept: "application/json",
        "X-API-KEY": "rjJ6OGD2IO25Ter8Y1dlIYMXnxAh57l4sLwlb5fR8hI=", // Your API Key here
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error: ${response.status} ${response.statusText}: ${errorText}`
      );
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Data from response: ", data);

    if (data && data.result) {
      const cryptos = data.result.map((crypto: any) => ({
        id: crypto.id,
        name: crypto.name,
        current_price: parseFloat(crypto.price),
        market_cap: parseFloat(crypto.marketCap),
      }));

      return cryptos;
    } else {
      console.error("Unexpected API response structure: ", data);
      throw new Error("API response structure is unexpected");
    }
  } catch (error) {
    if (retries > 0) {
      console.log(`Error occurred, retrying... Attempts left: ${retries}`);
      return await getTopCryptos(limit, page, retries - 1);
    } else {
      console.error("Error fetching crypto data: ", error);
    }
    throw error;
  }
};
