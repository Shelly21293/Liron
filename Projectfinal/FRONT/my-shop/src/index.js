import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './app/Login';
import MyCats from './app/MyCats';
import Products from './app/Products';
import Dress from './app/Dress';
import MiniCart from './app/MiniCart';
import Category from './app/Category';
import ACart from './app/ACart';
import Cart from './app/Cart';
// import { configureStore } from '@reduxjs/toolkit';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Cart />} />
            <Route path="/Dress" element={<Dress />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/cart" element= {<ACart/>} />
            <Route path="/category" element={<Category />} />
            <Route path="/categories" element={<MyCats />} >
              <Route path=":id" element={<Products />} />
            </Route>
          </Route>
        </Routes>

      </BrowserRouter>

    </Provider>
  </React.StrictMode>
);

reportWebVitals();
