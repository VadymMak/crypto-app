import React from "react";
import { useSelector } from "react-redux";
import { CryptoData } from "../store/cryptoSlice"; // Make sure this is imported
import Loader from "./Loader";

const CryptoList: React.FC = () => {
  const { currentPage, priceLimit, allCryptos } = useSelector(
    (state: any) => state.crypto
  );

  // Filter the coins based on price limit and pagination
  const filteredCryptos = allCryptos
    .filter((coin: CryptoData) => coin.current_price <= priceLimit)
    .slice((currentPage - 1) * 10, currentPage * 10); // Pagination: 10 coins per page

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
