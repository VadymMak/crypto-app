// src/App.tsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRotes"; // Import the routes

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;