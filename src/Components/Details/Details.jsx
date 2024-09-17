import React, { useEffect, useState } from 'react'
import './Details.css'
import img from '../../Assets/OPAC.jpeg'
import Cookies from 'universal-cookie'
import axiosConfig from '../../api/axiosConfig'
import { FaAngleDown, FaChevronUp, FaCartPlus} from "react-icons/fa6";
import { FaArrowCircleLeft } from "react-icons/fa";
import { json, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
    const cookiesVal = new Cookies(null, {path: '/dashboard'})
    const navigate = useNavigate();
    const value = cookiesVal.get("value")
    const cookiesEmail = new Cookies(null, {path: '/'})
    const cookies = new Cookies()
    const email =  cookiesEmail.get("response");
    console.log(email)
    const[details, setDetails] = useState()
    const[shoeProperties, setShowProperties] = useState(false);
    const[added, setAdded] = useState();

    const backWard = () => {
        navigate('/dashboard')
    } 
    const cart = () => {
        
        navigate('/cart')
    }
    const toggleProperties = () => {
        setShowProperties(!shoeProperties);
    }
    const handleOrder = () => {
        toast.success("Order Succesfully")
    }
   

    const getPhoneDetails = async() => {
        const response = await axiosConfig.get('api/details/phoneDetails',{
            params : {
            name : value
        }  
        })
        const data = response.data.data;
        setDetails(data)
        console.log(data)
        setAdded(data.name)
    }

    const addCart = async () => {
        const response = await axiosConfig.post("/api/user/addCart",null,{
            params : {
                mail : email,
                product : added
            }
        })
        const data = response.data;
        console.log(data)
        toast.success("Added to cart")

    }

    useEffect(()=>{
        const authToken = cookies.get('response'); // Assuming authToken is stored during login
        console.log(authToken);
        
        if (!authToken) {
            navigate('/'); // Redirect to login page if token is missing
        }
        else
            getPhoneDetails();
    }, []) 
  return (
    <>
        <ToastContainer position='top-center' autoClose='2000'/>
    <div className="details">
        <button className='backward' onClick={backWard}><FaArrowCircleLeft /></button>
        <button className='cart_page' onClick={cart}><FaCartPlus/></button>
        <div className='details_container'>
            <div className='details_left'>
                <img src={details?.images} alt="" />
            </div>
            <div className='details_right'>
                <div className='details_name'><p className="sliding_text">{details?.name}</p></div>
                <div className='details_price'>&#8377;{details?.price}</div>
                <div className='details_description'>{details?.description}</div>
                <button className='showProperties' onClick={toggleProperties}>
                    {shoeProperties ? <div className='show'><p>Hide Specs</p><FaChevronUp /></div> 
                    : <div className='show'><p>Show Specs</p><FaAngleDown /></div>
                    } 

                    </button>
                
                {shoeProperties &&
                    <div className='details_properties'>
                        <ul>
                            {details?.properties.map((item, index) => (
                                <li key={index}> {item} </li>
                            ))}
                        </ul>
                    </div>
                }
                <div className='product_bottom'>
                    <button className='buy_now' onClick={handleOrder}> Buy now </button>
                    <button className='cart' onClick={addCart}><FaCartPlus color='white'/>
                    </button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Details