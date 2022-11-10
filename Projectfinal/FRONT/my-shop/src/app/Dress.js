import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
// import { add } from './cartSlice';
import {selectProducts,getProdAsync, addProdAsync, updProdAsync, removeProdAsync} from './productsSlice';
// import {buyAsync} from './cartSlice'
import MiniCart from './MiniCart';
import { selectToken } from './loginSlice';
import ACart from './ACart';



const Dress = () => {
  const products = useSelector(selectProducts);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const[price,setPrice]=useState(0);
  const[desc,setDesc]=useState("");
  const[cid,setCid]=useState(0);

  
  useEffect(()=>{
    dispatch(getProdAsync(products))
  },[products.length])
  

  return (
    <div><h1>Admin</h1>
    Items in my shop:{" "}{products.length}<br></br>
    <br></br>
      
      Description:{" "}
      <input onChange={(e)=>setDesc(e.target.value)} style={{maxWidth:"80px"}}></input>{" "}<br></br>
      Price:{" "} 
      <input onChange={(e)=>setPrice(e.target.value)} style={{maxWidth:"30px"}}></input>{" "}
      Category Id:{""}
      <input onChange={(e)=>setCid(e.target.value)} style={{maxWidth:"30px"}}></input>{" "}
    
      <button onClick={()=>dispatch(addProdAsync({desc:desc, price:price, cat_id_id:cid, token:token}))}>Add</button><br></br><br></br>
      
      {products.map((prod,i)=>(
      <div key={i}>
        {prod.desc}{" "}{prod.price}{"$"}<br></br><br></br>
        <button onClick={()=> dispatch(updProdAsync({desc:desc, price:price, id:prod.id, token:token}))}>update</button>
        <button onClick={()=>dispatch(removeProdAsync({id:prod.id, token:token}))}>Remove</button>
        {/* <button onClick={()=> dispatch(buyAsync({desc:prod.desc,price:prod.price,amount:amount, token:token}))}>Buy</button>{" "} */}
      </div>))}
      
    </div>
      );
};

export default Dress;
