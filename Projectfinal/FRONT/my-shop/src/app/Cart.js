import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectCart, getCartAsync} from './cartSlice';



const Cart = () => {
    <h1>CART</h1>
    const myCart = useSelector(selectCart);
    const dispatch = useDispatch();
    // const [Amount, setAmount] = useState(0)
    useEffect(()=>{dispatch(getCartAsync());},[]);

    
    
    return (
      <div>
        {/* <input onChange={(e)=>setAmount(e.target.value)}/>   */}
        {myCart.map((order,i)=>(
            <div key={i}>
                {order.amount}{order.desc}: {order.price} {order.cust_id}
                {/* <button onClick={()=>dispatch(removeProdAsync(order.id))}>Remove</button> */}
                
            </div>
    ))}
        <button>nnnnn</button>
      </div>  

    )

} 

export default Cart;