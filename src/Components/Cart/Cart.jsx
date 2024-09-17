import React, { useState, useEffect } from 'react';
import './Cart.css'
import { MdRemoveShoppingCart } from "react-icons/md";
import { FaArrowCircleLeft } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Cookies from 'universal-cookie';
import axiosConfig from '../../api/axiosConfig'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const cookiesVal = new Cookies(null, {path: '/'})
  const email =  cookiesVal.get('response');
  
  const home = () => {
    navigate('/dashboard')
  }
  useEffect(() => {
    if (!email) {
      navigate('/'); 
    }
  }, [email, navigate]);

 const retrieveCart = async () => {
 try {
  const response = await axiosConfig.get('/api/user/showCart', {
    params : {
      mail : email
    }
  })
  const data = response.data.data;
  console.log(data);
  setCartItems(data)
 }
 catch (error) {
  console.error("Error fetching cart data", error.response?.data || error.message);
  toast.error("Error fetching cart data: " + (error.response?.data?.message || error.message));
  
 }
}

  useEffect(()=>{
    retrieveCart();
    
  }, [])

  const removeCart = async (item) => {
    const response = await axiosConfig.get('/api/user/removecartitem', {
      params : {
        mail : email,
        item: item
      }
    })
    const data = response.data.data;
    retrieveCart()
   }

  /*useEffect(() => {
    if(product.length >= 0){
      product.map((item)=>{
        getProduct(item)
      })
    }
  }, [product])*/

  return (
    <><ToastContainer position='top-center' autoClose='2000'/>
    <div className='cartt_page'>
      <button className='home' onClick={home}><IoMdHome /></button>
      <div className='cart_top'>Shopping Cart</div>
      <div className='cart_content'>
      {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} style={{ marginBottom: '20px' }} className='cart_inn'>
                <img src={item?.images} alt={item.name} width="100" className='cart_image' />
                <span className='cart_center'>
                  <h2 className='cart_name'>{item?.name}</h2>
                  <p className='cart_price'>Price: &#8377;{item?.price}</p>
                </span>
                <button className='remove' onClick={() => removeCart(item?.name)}><MdRemoveShoppingCart /></button>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
      </div>
      
    </div>
    </>
  );
};

export default CartPage;