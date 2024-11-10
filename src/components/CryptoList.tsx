// src/components/CryptoList.tsx
import React from "react";
import { CryptoData } from "../api/coinGecko";

interface CryptoListProps {
  cryptoData: CryptoData[];
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptoData }) => {
  return (
    <div>
      <ul>
        {cryptoData.map((coin) => (
          <li key={coin.id}>
            <h2>{coin.name}</h2>
            <p>Price: ${coin.current_price}</p>
            <p>Market Cap: ${coin.market_cap}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoList;
