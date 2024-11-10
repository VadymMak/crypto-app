// src/components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import styles from "./Layout.module.scss"; // Import SCSS module for layout styles

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <HeaderComponent />
      <main className={styles.mainContent}>
        <Outlet /> {/* This is where routed content will render */}
      </main>
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Crypto App</p>
      </footer>
    </div>
  );
};

export default Layout;
