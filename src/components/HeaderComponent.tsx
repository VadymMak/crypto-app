import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderComponent.module.scss"; // Import SCSS module

const HeaderComponent: React.FC = () => {
  return (
    <header className={styles.header}>
      {" "}
      {/* Apply header styles */}
      <nav>
        <ul>
          <li>
            <Link to="/" className={styles.link}>
              Home
            </Link>{" "}
            {/* Apply link styles */}
          </li>
          <li>
            <Link to="/about" className={styles.link}>
              About
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;
