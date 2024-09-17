import React from 'react'
import './NavBar.css'
import { IoSearch } from "react-icons/io5"
import { FaCartPlus } from "react-icons/fa6"
import { VscAccount } from "react-icons/vsc"
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Cookies from 'universal-cookie'
import Profile from '../Profile/Profile'
import Main from '../Main/Main'
import MainContainer from '../Main/MainContainer'
import Details from '../Details/Details'
import UploadDetails from '../UploadDetails/UploadDetails'
const NavBar = () => {
    const[isProfile, setIsProfile] = useState(false);
    const[show, setShow] = useState("");
    const[searchQuery, setSearchQuery] = useState(null)
    const navigate = useNavigate()
    const cookiesVal = new Cookies(null, {path: '/'})
    const roles = cookiesVal.get('roles')


    const cart = () => {
        navigate('/cart')
    }

  return (
    <>
    {isProfile && <Profile setIsProfile = {setIsProfile}/>}
    <div className='page'>
        <div className='navbar'>
            <div className='navbar_container'>
                <div className='navbar_logo'>
                    <img src="" alt="" />
                </div>
                <p className='product_all' onClick={()=>setShow(null)}>All</p>
                <p className='product_phone' onClick={()=>setShow("Mobile")}>Phone</p>
                <p className='product_laptop' onClick={()=>setShow("Laptop")}>Laptop</p>
                <div className='navbar_search'>
                    <IoSearch className='search_icon'/>
                    <input className='navbar_search_input' type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search Items'/>
                    {
                        roles === "admin" ? <p className='navbar_uploadDetails' onClick={()=> navigate('/uploadDetails')}>UploadDetails</p> : <span className='navbar_span'></span>
                    }
                    
                </div>
                <div className='navbar_cart'>
                    <p><FaCartPlus className='cart_icon' onClick={cart}/></p>
                </div>
                <div className='navbar_account'>
                    <p><VscAccount className='account_icon' onClick={()=> setIsProfile(true)}/></p>
                </div>
            </div>
            
        </div>
        <div className='main'>
            <Main searchQuery={searchQuery} show={show}/>
        </div>
    </div>
    </>
  )
}

export default NavBar
