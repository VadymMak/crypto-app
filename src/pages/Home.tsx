import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setPriceLimit,
  setTotalPages,
  setAllCryptos,
  appendCryptos,
} from "../store/cryptoSlice";
import { getTopCryptos } from "../api/coinStats"; // Assuming this is the updated API call
import styles from "./Home.module.scss";
import CryptoList from "../components/CryptoList";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage, priceLimit, totalPages, allCryptos } = useSelector(
    (state: any) => state.crypto
  );

  const [userPriceLimit, setUserPriceLimit] = useState<number>(priceLimit);

  // Initial load for the first 250 cryptos
  useEffect(() => {
    const fetchInitialCryptos = async () => {
      try {
        const data = await getTopCryptos(250, 1, 0);
        if (data && Array.isArray(data)) {
          dispatch(setAllCryptos(data));
          dispatch(setTotalPages(Math.ceil(data.length / 10)));
        } else {
          dispatch(setAllCryptos([])); // Return an empty array if no data
          dispatch(setTotalPages(0)); // Set totalPages to 0
          console.error("API returned invalid data");
        }
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchInitialCryptos();
  }, [dispatch]);

  // Update the price limit in the Redux store
  useEffect(() => {
    dispatch(setPriceLimit(userPriceLimit));
  }, [userPriceLimit, dispatch]);

  // Pagination: Load additional data if necessary when moving to the next page
  const nextPage = async () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));

      // Fetch and append more data if moving to a new block of pages
      if (currentPage * 10 >= allCryptos.length) {
        const nextBatch = await getTopCryptos(
          250,
          Math.floor(currentPage / 10) + 2
        );
        dispatch(appendCryptos(nextBatch));
      }
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

  const fetchData = async () => {
    if (process.env.NODE_ENV === "development") {
      // Only fetch data if it's not already available in the Redux store
      if (allCryptos.length === 0) {
        try {
          const data = await getTopCryptos(250, 1, 0);
          dispatch(setAllCryptos(data));
          dispatch(setTotalPages(Math.ceil(data.length / 10)));
        } catch (error) {
          console.error("Error fetching crypto data:", error);
        }
      }
    } else {
      // Production API call
      await fetchInitialCryptos();
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

      {/* Fetch Data Button */}
      <div>
        <button className={styles.fetchButton} onClick={fetchData}>
          Fetch Data from API
        </button>
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
function fetchInitialCryptos() {
  throw new Error("Function not implemented.");
}
