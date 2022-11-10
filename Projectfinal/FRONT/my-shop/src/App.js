import React, { useEffect, useState } from 'react';
import './App.css';
import { useSelector } from 'react-redux';
import { selectUserName } from './app/loginSlice';
import { Outlet, useAsyncValue } from 'react-router-dom';
import MyNav from './app/MyNav';
import axios from 'axios';
// import {API_URL, URL, IMAGES_URL} from './constants'

function App() {
  const URL = "http://127.0.0.1:8000/token/"
  const userName = useSelector(selectUserName);

  return (
    <div>
      <nav style={{ borderBottom: "solid 1px", paddingBottom: "1rem" }}>
        <MyNav></MyNav>
        {userName && <div>Hello:{userName}</div>}
        <Outlet></Outlet>
      </nav>
    </div>
  )
}
export default App;


{/* {userFromToke.length > 0  && `  ${userFromToke}   is logged`} */ }