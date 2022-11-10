import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signin } from './loginAPI';
import jwt_decode from "jwt-decode";
import {getNotes} from './notesApi'
import {selectToken} from './loginSlice';

const initialState = {
  notes:[]
};

export const getNotesAsync = createAsyncThunk(
  'notes/getNotes',
  async (token) => {
    const response = await getNotes(token);
    return response.data;
  }
);

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
       
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(getNotesAsync.fulfilled, (state,action) => {
        state.notes=(action.payload)
      });
  },
});

export const { logout } = notesSlice.actions;
export const selectNotes = (state) => state.notes.logged;
export default notesSlice.reducer;
