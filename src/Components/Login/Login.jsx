import React from 'react'
import './Login.css'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import SignUp from '../SignIn/SignUp'
import axiosConfig from '../../api/axiosConfig'
import { toast } from 'react-toastify'
import Cookies from 'universal-cookie'
import { ClipLoader } from 'react-spinners';
const Login = () => {
    const[isLogin, setLogin] = useState(true)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const[roles, setRoles] = useState("");
   
    const[loginField, setLoginField] = useState({
        mail: "",
        password: ""
    })
    

    const onhandleChange = (e) => {
        setLoginField({
        ...loginField,
        [e.target.name]: e.target.value
    })
    }

    const loginSubmit = async () => {
        console.log("Logging in");
        setLoading(true)
        try {
            console.log("accessing url");
            
            const response = await axiosConfig.post("/api/user/login",{
                mail: loginField.mail,
                password: loginField.password
            }); 
            console.log(response);
            console.log("getiing response.....");
            
            if(response && response.data && response.data.data){
                toast.success(response.data.message)
                const cookies = new Cookies()
                cookies.set('response', response.data.data.mail)
                cookies.set('roles', response.data.data.roles)

                setRoles(response.data.data.roles)
                setTimeout(() => { 
                    navigate('/dashboard');
                }, 2000)
            }
            else{
                toast.error("Login first")
            }
            
        } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.message)

        }finally{
            setTimeout(() => {
                setLoading(false)
            }, 2000);   
        }
    }
    
  return (
    <>
    {!isLogin && <SignUp setLogin={setLogin}/>}
    {loading ? 
        <div className="loader-container">
            <ClipLoader loading={loading} size={50} />
        </div>
    :
    <div className='login_page'>
        <div className='login_container'>
        
            <div className='login_login'>
                <p className='login_head'>Login</p>
            </div>
            <div className='login_mail'>
                <label className='login_label-mail' defaultValue="Email">Email</label>
                <input type="text" name='mail' value={loginField.mail || ""} onChange={onhandleChange}/>
            </div>  
            <div className='login_password'>
                <label className="login_label-password">Password</label>
                <input type="password" name='password' value={loginField.password || ""} onChange={onhandleChange}/>
            </div> 
            <div className='login_button'>
                <button className='login_button_button' onClick={loginSubmit}>Login</button>
            </div>
            <p className='login_to_signup'>if you haven't account <span onClick={(e)=>setLogin(false)}>SignUp</span></p>
        </div>
    </div>
    }
    </>
  )
}

export default Login