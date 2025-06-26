import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { ShopProvider } from "./Components/ShopContext";


// ✅ Ensure this path is correct

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <ShopProvider> 
  <BrowserRouter> 
    <App />
   
  </BrowserRouter>
</ShopProvider>


  </React.StrictMode>
);
