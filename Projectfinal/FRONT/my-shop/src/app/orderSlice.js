import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {sendOrders} from './orderAPI';

const initialState = {
  myorders: [],
  status: "idle"
};
export const sendOrderAsync = createAsyncThunk(
  'order/sendOrders',
    async (payload) => {
    const response = await sendOrders(payload.myorders, payload.token);
    return response.data;
  }
);
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      sendCart: (state,action) => {
        state.myorders=action.payload
        console.log(state.myorders)
      },
      clearAr: (state) => {
        state.myorders=[]
      }
      
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendOrderAsync.fulfilled, (state,action) => {
        // state.myorders=action.payload
      });
  },

});

export const { sendCart, clearAr } = orderSlice.actions;
export const selectorders=(state)=>state.order.myorders;
export default orderSlice.reducer;
