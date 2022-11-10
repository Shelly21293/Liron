import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signin, signup } from './loginAPI';
import jwt_decode from "jwt-decode";

const initialState = {
  userName:" ",
  email:"",
  status:'idle',
  token:"",
  logged: false,
  is_staff:false
  
};
export const dosignupAsync = createAsyncThunk(
  'login/signup',
  async (action) => {
    const response = await signup(action);
    return response.data;
  }
);

export const dosigninAsync = createAsyncThunk(
  'login/signin',
  async (action) => {
    const response = await signin(action);
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
        logout: (state,action) => {
          state.token=""
            state.logged=false;
            state.userName=""
            state.email=""
        }   
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(dosigninAsync.fulfilled, (state,action) => {
        console.log(action.payload.access)
        if(action.payload.access){
          state.token=action.payload.access
          state.logged=true;
          state.userName=jwt_decode(action.payload.access).username
          state.email=jwt_decode(action.payload.access).eeemail
          state.is_staff=jwt_decode(action.payload.access).staff
        }
      })
        
      .addCase(dosignupAsync.fulfilled,(state,action) => {
        console.log(action.payload.access)
        if(action.payload.access){
          state.token=action.payload.access
          state.logged=true
          state.userName=jwt_decode(action.payload.access).username
          state.password=jwt_decode(action.payload.access).password
          state.email=jwt_decode(action.payload.access).eeemail
          state.is_staff=jwt_decode(action.payload.access).staff
        }
      })
  }
})
    
export const {logout} = loginSlice.actions;
export const selectLogged = (state) => state.login.logged;
export const selectEmail = (state) => state.login.email;
export const selectUserName = (state) => state.login.userName;
export const selectToken = (state) => state.login.token;
export const selectStaff=(state)=>state.login.staff;
export default loginSlice.reducer;
