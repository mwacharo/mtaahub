import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'

import { CartProvider } from './context/CartContext'


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from "./pages/Landing.jsx";
import Checkout from "./pages/Checkout.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}

      <CartProvider>

        {/* <Checkout /> */}
    

        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/checkout" element={<Checkout />} />
        
      </Routes>
    </BrowserRouter>
        </CartProvider>

  </StrictMode>,

    // </CartProvider>

)
