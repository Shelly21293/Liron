import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCart, buyProduct,removeProduct } from './cartAPI';

const initialState = {
  orders: [],
  status: "idle"
};
export const getCartAsync = createAsyncThunk(
  'Cart/getCart',
  async () => {
    const response = await getCart();
    return response.data;
  }
);

export const buyAsync = createAsyncThunk(
  'Cart/buyProduct',
  async (newProd) => {
    const response = await buyProduct(newProd);
    return response.data;
  }
);
export const removeProdAsync = createAsyncThunk(
  'Cart/removeProduct',
  async (id) => {
    const response = await removeProduct(id);
    return response.id;
  }
);
export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    // add: (state,action) => {
    //   console.log(action)
    //   state.orders.push(action.payload);
    // },
  //   remove: (state) => {
  //     state.value -= 1;
  //   },
    
  //   update: (state, action) => {
  //     state.value += action.payload;
  //   },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCartAsync.fulfilled, (state,action) => {
        state.orders=action.payload
        console.log(action.payload);
  // state.status="loading"
      })
      .addCase(buyAsync.fulfilled, (state, action) => {
        state.orders.push=action.payload
        state.status = 'idle';
        console.log(action.payload);
      })
      .addCase(removeProdAsync.fulfilled, (state, action) => {
        state.orders=state.orders.filter(x=>x.id !==action.payload);
      });
  },   

}); 

export const { add, remove, update } = CartSlice.actions;
export const selectCart=(state)=>state.cart.orders;
export default CartSlice.reducer;
