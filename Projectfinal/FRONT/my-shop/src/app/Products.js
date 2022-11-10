import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux';
import {selectUserName} from './loginSlice';
import { getProdAsync, selectProducts } from './productsSlice';
import {selectCats} from './catSlice';
import {sendCart, clearAr} from './orderSlice';

const Products = () => {
    let params=useParams();
    let id=params.id;
    const userName=useSelector(selectUserName);
    const allProducts=useSelector(selectProducts);
    const categories=useSelector(selectCats);
    const dispatch=useDispatch();
    const [myCart, setmyCart] = useState([])
    const [amountCng, setamountCng] = useState(0)
  
  useEffect(() => {
    dispatch(getProdAsync(allProducts))
  }, [allProducts.length])
    
  useEffect(() => {
      setmyCart(JSON.parse(localStorage.getItem("myCart")))
      }, [])
  // runs when we change category
  useEffect(() => {
    dispatch(getProdAsync(id))
    }, [id])
  
  // runs when we change the length of the cart
  useEffect(() => {
      console.table(myCart)
      localStorage.setItem("myCart", JSON.stringify(myCart))
    }, [myCart.length, amountCng])

  const setAmount=(item)=>{
    myCart.forEach((element)=>{
      if (element._id===item._id) {
      element.amount=+ item.amount;
      setamountCng(amountCng+1)
      }
  });
  dispatch(sendCart(myCart));
};

  const addToCart=(item)=>{
    let temp= myCart.find((x)=>x._id===item._id);
    if (temp) {
      temp.amount += item.amount;
      setmyCart(myCart);
    } 
    else {
      setmyCart([...myCart, item]);
      localStorage.setItem("myCart", JSON.stringify(myCart));
    }
    console.table(myCart)
    localStorage.setItem("myCart", JSON.stringify(myCart));

  };

  return (
    <div>
      <h4>{userName && <div>Hello{userName}</div>}</h4> 
      <button onClick={()=>setmyCart([])}>Clear Cart</button>
      <button onClick={()=>console.table(myCart)}>Show Cart</button>
      <button onClick={()=>dispatch(sendCart(myCart))}>send</button>
      {/* <button onClick={()=>dispatch(clearAr())}>Test</button> */}

      {id===0 && 'ALL'}{id>0 && categories[id-1].desc}
      {allProducts.map(prod=>
          <div>
                {prod.desc}{" "}{" "}{" "}{prod.price}{"$"}{" "} 
                <button onClick={()=>dispatch(addToCart({_id:prod.id, desc:prod.desc, amount:1, price:prod.price, cat_id:prod.cat_id}))}>Add to Cart</button>
          </div>)}
      {myCart.map(prod =>
          <div><button onClick={() => dispatch(addToCart({_id: prod.id, desc: prod.des, amount: 1, price: prod.price }))}>+</button>
              {prod.desc},{prod.id}, {prod.amount}, &nbsp;{prod.price}{"$"} 
              <button onClick={() => dispatch(addToCart({_id: prod.id, desc: prod.des, amount: -1, price: prod.price }))}>-</button>
          </div>)}
    </div>
  )

}
export default Products