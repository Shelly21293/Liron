import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProducts, addProducts,updProducts, removeProduct } from './prodAPI';

const initialState = {
  productslst: [],
  status: "idle"
};
export const getProdAsync = createAsyncThunk(
  'products/getProducts',
    async (newProd) => {
    const response = await getProducts(newProd);
    return response.data;
  }
);

export const addProdAsync = createAsyncThunk(
  'products/addProducts',
  async (newProd) => {
    console.log(newProd)
    const response = await addProducts(newProd);
    return response.data;
  }
);
export const updProdAsync = createAsyncThunk(
  'Dress/updProducts',
  async (newProd) => {
    const response = await updProducts(newProd, newProd.id);
    return response.data;
  }
);
export const removeProdAsync = createAsyncThunk(
  'Dress/removeProduct',
  async (payload) => {
    console.log(payload)
    const response = await removeProduct(payload);
    return response.data;
  }
);
export const productsSlice = createSlice({
  name: 'products',
  initialState,
   reducers: {
    // add: (state,action) => {
    //   console.log(action)
    //   state.productslst.push(action.payload);
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
  .addCase(getProdAsync.fulfilled, (state,action) => {
    console.log(action.payload)
    state.productslst=action.payload
  // state.status="loading"
    })
  .addCase(addProdAsync.fulfilled, (state, action) => {
    state.productslst.push(action.payload);
    state.status = 'idle';
    console.log(action.payload)
    })
  .addCase(updProdAsync.fulfilled, (state, action) => {
      let oldProd=state.productslst.find(x =>x.id === action.payload.id); 
      oldProd.desc=action.payload.desc
      oldProd.price=action.payload.price
      console.log(action.payload)
    })
  .addCase(removeProdAsync.fulfilled, (state, action) => {
      state.productslst=state.productslst.filter(x=>x._id !==action.payload);
    });
  },
});

export const { get,add, update, remove } = productsSlice.actions;
export const selectProducts=(state)=>state.product.productslst;
export default productsSlice.reducer;
