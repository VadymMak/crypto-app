import React from "react";
import { useSelector } from "react-redux";
import { CryptoData } from "../store/cryptoSlice"; // Make sure this is imported
import Loader from "./Loader";

const CryptoList: React.FC = () => {
  const { currentPage, priceLimit, allCryptos } = useSelector(
    (state: any) => state.crypto
  );

  // Check if allCryptos is available before calling filter
  const filteredCryptos = allCryptos
    ? allCryptos
        .filter((coin: CryptoData) => coin.current_price <= priceLimit)
        .slice((currentPage - 1) * 10, currentPage * 10)
    : []; // If allCryptos is undefined or null, return an empty array

  return (
    <div>
      {filteredCryptos.length === 0 ? (
        <Loader />
      ) : (
        <ul>
          {filteredCryptos.map((coin: CryptoData) => (
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
