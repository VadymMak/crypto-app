import React, { useEffect, useState } from "react";
import { getTopCryptos, CryptoData } from "../api/coinGecko";
import Loader from "./Loader";

interface CryptoListProps {
  currentPage: number;
  priceLimit: number;
}

const CryptoList: React.FC<CryptoListProps> = ({ currentPage, priceLimit }) => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getTopCryptos(10, currentPage, priceLimit);
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, priceLimit]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <ul>
          {cryptoData.map((coin) => (
            <li key={coin.id}>
              <h2>{coin.name}</h2>
              <p>Price: ${coin.current_price}</p>
              <p>Market Cap: ${coin.market_cap}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CryptoList;
