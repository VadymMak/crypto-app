import React, { useState, useEffect } from "react";
import CryptoList from "../components/CryptoList";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setPriceLimit,
  setTotalPages,
} from "../store/cryptoSlice";
import styles from "./Home.module.scss";
import { getTopCryptos } from "../api/coinGecko";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, priceLimit, totalPages } = useSelector(
    (state: any) => state.crypto
  );

  const [userPriceLimit, setUserPriceLimit] = useState<number>(priceLimit);

  useEffect(() => {
    dispatch(setPriceLimit(userPriceLimit));
  }, [userPriceLimit, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(
          `Fetching data for page: ${currentPage} with price limit: ${userPriceLimit}`
        );
        const { data, totalItems } = await getTopCryptos(
          10,
          currentPage,
          userPriceLimit
        );
        dispatch(setTotalPages(Math.ceil(totalItems / 10)));
        console.log(`Data for Page ${currentPage}:`, data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };
    fetchData();
  }, [currentPage, userPriceLimit, dispatch]);

  const nextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handlePriceLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value >= 0) {
      setUserPriceLimit(value);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Top Cryptocurrencies (Page {currentPage})</h1>
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

      {/* Pass currentPage and priceLimit to CryptoList */}
      <CryptoList currentPage={currentPage} priceLimit={userPriceLimit} />

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
