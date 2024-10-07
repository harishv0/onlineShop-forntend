import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies  from 'universal-cookie';
import axiosConfig from '../../api/axiosConfig';
import './Profile.css'
const Profile = ({setIsProfile}) => {
  const navigate = useNavigate();
  const[user, setUser] = useState();
  const cookiesVal = new Cookies(null, {path: '/'})
  const email =  cookiesVal.get("response");
  const fileInputRef = useRef(null);
  const[file, setFile] = useState();
  const[selectedImage, setSelectedImage] = useState();
  
  
  const handleFileClick = () => {
    fileInputRef.current.click();
  }
  const handleImage = (e) => {
    const file = e.target.files[0]
    setFile(file);
    if(file){
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const image = fileReader.result
        setSelectedImage(image)
      }
      fileReader.readAsDataURL(file)
    }
    
  }
  

  const getUser = async() => {
      const response = await axiosConfig.get("/api/user/profile",{
        params : {
          mail : email
        }
      });
      const data = response.data;
      setUser(data);
      console.log(data);
      
  }
  const handleLogOut = () => {
    cookiesVal.remove('response');
    cookiesVal.remove('roles');
    cookiesVal.remove('value')
    navigate('/')
  }
   
  useEffect(()=>{
    getUser();

  },[])
  
  const uploadProfile = async() =>{
    if(!file){
      alert('Please select a file first');
      return;
    }
    const formdata = new FormData();
    formdata.append("mail", user?.mail)
    formdata.append("image", file)
    try {
      const data = await axiosConfig.post("/api/user/profilePhoto",formdata,{
      headers : {
        'Content-Type' : 'multipart/form-data'
      }
    })
    console.log("Upload Successfully", data.data.data.profile)
    alert("upload successfully")
    } catch (error) {
      console.error("Error uploading profile photo", error);
      alert("not uploaded")
    }
    getUser();
  }
  useEffect(()=>{
  if(file){
    uploadProfile();
    }
  }
  ,[file])
  return (
    <div className='profile'>
      <div className='profile_container'>
        <p className='cancel_button' onClick={()=> setIsProfile(false)}>X</p>
        <div className='profile_div'>
          <h1 >Profile</h1>
        </div>
        <div className='profile_pic'>
          <input
           type="file" 
           ref={fileInputRef}
           style={{display:'none'}}
           onChange={handleImage}/>
           {
            user?.profile ? (
              <>
                <img className='profile_image' onClick={handleFileClick} src={user?.profile} style={{height:'100px', width:'100px'}}/>
                <button className='profile-change_browse'onClick={handleFileClick}>Change</button>
              </>
            ) : (
                selectedImage ? (
                  <>
                    <img className='profile_image' onClick={handleFileClick}src={selectedImage} style={{height:'100px', width:'100px'}}/>
                    <button className='profile-change_browse'onClick={handleFileClick}>Change</button>
                </>):(
                  <button className='profile-upload_browse'onClick={handleFileClick}>Browse Photo</button>
                )
            )
           }
        </div>
        <div className='profile_name'>
          <p className="profile_name_p">{user?.name}</p>
        </div>
        <div className='profile_mail'>
          <p className='profile_mail_p'>{user?.mail}</p>
        </div>
        <div className='profile_logout'>
          <button type='submit' onClick={handleLogOut} >LogOut</button>
        </div>
      </div>
    </div>
  )
}

export default Profile;
