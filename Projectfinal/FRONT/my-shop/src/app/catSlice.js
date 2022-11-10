import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getcats } from "./catAPI";

const initialState={
    Cats:[]
};

export const getcatAsync=createAsyncThunk(
    'cat/getcats',
    async()=> {
        const response=await getcats();
        return response.data;
    } 
);
export const catSlice= createSlice({
    name:'cat',
    initialState,
    reducers:{
    },
    extraReducers: (builder)=>{
      builder
        .addCase(getcatAsync.fulfilled, (state,action)=>{
            state.Cats=action.payload
        });
        
    },
});

export const {logout}=catSlice.actions;
export const selectCats= (state)=>state.cat.Cats;
export default catSlice.reducer;