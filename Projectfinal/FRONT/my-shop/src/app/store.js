import { configureStore } from '@reduxjs/toolkit';
// import { Middleware } from '@reduxjs/toolkit';
import productsSlice from './productsSlice';
import cartSlice from './cartSlice';
import loginSlice from './loginSlice';
import notesSlice from './notesSlice';
import orderSlice from './orderSlice';
import catSlice from './catSlice';
 

export const store = configureStore({
  reducer: {
    product: productsSlice,
    cart: cartSlice,
    login: loginSlice,
    notes: notesSlice,
    order: orderSlice,
    cat: catSlice,
  }
})
