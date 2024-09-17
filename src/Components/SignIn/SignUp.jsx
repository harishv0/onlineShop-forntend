import React from 'react'
import './SignUp.css'
import {useState} from 'react'
import axiosConfig from '../../api/axiosConfig'
import { toast } from 'react-toastify'
const SignUp = ({setLogin}) => {
  const[signupField, setSignupField] = useState({
    name: "",
    mail: "",
    password: ""
  })
  const onhandleChange =(e) => {
    setSignupField({
      ...signupField,
      [e.target.name]:e.target.value,
  })
  }
  const signUpSubmit = async(e) => {
    e.preventDefault();
    const response = await axiosConfig.post("/api/user/signup",{
      name: signupField.name,
      mail: signupField.mail,
      password: signupField.password
    })
    setLogin(true);
    console.log(response);
    toast.success(response.data)
  }
  return (
    <div className='signup_page'>
        <div className='signup_container'>
          <div className='signup_signup'>
            <p className='signup_cancel' onClick={()=>setLogin(true)}>X</p>
            <p className='signup_head'>SignUp</p>
          </div>
          <div className='signup_name'>
            <input type="text" placeholder='UserName' name='name' value={signupField.name} onChange={onhandleChange}/>
          </div>
          <div className='signup_email'>
            <input type="email" placeholder='Email'name='mail' value={signupField.mail} onChange={onhandleChange}/>
          </div>
          <div className='signup_password'>
            <input type="password" placeholder='Password' name='password' value={signupField.password} onChange={onhandleChange}/>
          </div>
          <div className='signup_button'>
            <button className='signup_button_button' onClick={signUpSubmit}>SignUp</button>
          </div>
          <p className='signup_to_login'>Already if you have a account <span onClick={()=>setLogin(true)}>Login</span></p>
        </div>
    </div>
  )
}

export default SignUp
