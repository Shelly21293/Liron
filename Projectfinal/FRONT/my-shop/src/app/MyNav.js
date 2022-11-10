import React from 'react'
import {Link} from 'react-router-dom'

const MyNav = () => {
  return (
    <div>
        <nav>
        <Link to= "/Login">Login</Link>|
        <Link to= "/Dress">Admin</Link>||{" "}        
        <Link to= "/categories">Categories</Link>||{" "}
          <Link to= "/products">Products</Link>||{" "}
        <Link to= "/cart">My Cart</Link>||{" "}
        <Link to= "/orders">My Orders</Link>||{" "}
        </nav>  
  </div>  
  )
}


export default MyNav
