// src/pages/Home.tsx
import React, { useState, useEffect } from "react";
import CryptoList from "../components/CryptoList";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setTotalPages } from "../store/cryptoSlice";
import styles from "./Home.module.scss";
import { getTopCryptos } from "../api/coinGecko";
import Pagination from "../components/Pagination";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, priceLimit, totalPages } = useSelector(
    (state: any) => state.crypto
  );
  const [userPriceLimit, setUserPriceLimit] = useState<number>(priceLimit);
  const [cryptoData, setCryptoData] = useState<any[]>([]); // Store coins data here

  // Fetch cryptocurrencies with the updated price filter
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from API
        const { data, totalItems } = await getTopCryptos(
          10,
          currentPage,
          userPriceLimit
        );

        // Dispatch the total pages based on filtered data length
        dispatch(setTotalPages(Math.ceil(totalItems / 10)));

        // Set the filtered data in state
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchData();
  }, [currentPage, userPriceLimit, dispatch]);

  // Handle page changes
  const nextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1)); // Increment page
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1)); // Decrement page
    }
  };

  // Handle price limit change
  const handlePriceLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value >= 0) {
      setUserPriceLimit(value); // Set price limit
    }
  };

  return (
    <div className={styles.home}>
      <h1>Top Cryptocurrencies (Page {currentPage})</h1>

      {/* Price Limit Input */}
      <div className={styles.priceFilter}>
        <label htmlFor="priceLimit">Price Limit (in USD):</label>
        <input
          type="number"
          id="priceLimit"
          value={userPriceLimit}
          onChange={handlePriceLimitChange}
          min="0"
          step="0.01" // Allow decimal values for cents
        />
      </div>

      <CryptoList cryptoData={cryptoData} />

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default Home;
