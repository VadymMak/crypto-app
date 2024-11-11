import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setPriceLimit,
  setTotalPages,
  setAllCryptos,
  appendCryptos,
} from "../store/cryptoSlice";
import { getTopCryptos } from "../api/coinGecko";
import styles from "./Home.module.scss";
import CryptoList from "../components/CryptoList";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, priceLimit, totalPages } = useSelector(
    (state: any) => state.crypto
  );

  const [userPriceLimit, setUserPriceLimit] = useState<number>(priceLimit);

  useEffect(() => {
    // Fetch all data only once and store in Redux
    const fetchAllCryptos = async () => {
      try {
        const data = await getTopCryptos(250, 1, 0); // Initial load
        dispatch(setAllCryptos(data)); // Store the first set of cryptos
        dispatch(setTotalPages(Math.ceil(data.length / 10))); // Update totalPages based on length
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchAllCryptos();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPriceLimit(userPriceLimit)); // Update price limit in the store
  }, [userPriceLimit, dispatch]);

  const nextPage = async () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1)); // Increment page
      const newCryptos = await getTopCryptos(
        250,
        currentPage + 1,
        userPriceLimit
      );
      dispatch(appendCryptos(newCryptos)); // Append the new data
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1)); // Decrement page
    }
  };

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
          step="0.01"
        />
      </div>

      <CryptoList />

      <div className={styles.paginationButtons}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
