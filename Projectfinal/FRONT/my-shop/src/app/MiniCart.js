import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectCart} from './cartSlice';

const MiniCart = () => {
    const myCart = useSelector(selectCart);
  return (
    <div style={{backgroundColor:'pink'}}> 
      Items in your cart: {myCart.length}
      
    
    </div>
  )
}
export default MiniCart