import React, { useState, useRef, useEffect } from 'react';
import './UploadDetails.css';
import axiosConfig from '../../api/axiosConfig';
import { IoMdHome } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const UploadDetails = () => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const[file, setFile] = useState()
  const formData = new FormData();
  const navigate = useNavigate();
  const cookies = new Cookies()
  const[data, setData] = useState({
      image : selectedImage,
      type: "",
      name : "",
      price : "",
      description : "",
      properties : ""
    
})
useEffect(() => {
  const authToken = cookies.get('response'); // Assuming authToken is stored during login
  const role = cookies.get('roles')
  if (!authToken) {
    navigate('/'); // Redirect to login page if token is missing
  }
  if(role !== 'admin') navigate('/dashboard')
}, [navigate, cookies]);
  const onhandleChange =(e) =>{
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }
  const handleFileClick = () => {
    fileInputRef.current.click(); // triggers the file input click
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const image  = fileReader.result;
        setSelectedImage(image);
        setData(prev => ({
          ...prev,
          image : image
        }))
      };
      fileReader.readAsDataURL(file);
    }
  };
  const handleUpload = async(e) => {
    e.preventDefault();
    formData.append('file', file)
    formData.append('type', data.type)
    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('description', data.description)
    formData.append('properties', data.properties)

    const response = await axiosConfig.post("/api/details/uploadPost", formData,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    console.log(response.data)
    setData({
      image: null,
      type: "",
      name: "",
      price: "",
      description: "",
      properties: ""
    })
    setSelectedImage(null);
    setFile(null);
    fileInputRef.current.value = "";
  }
  
  return (
    <div className='upload'>
      <button className='home' onClick={()=> navigate('/dashboard')}><IoMdHome/></button>
      <div className='upload_details_container'>
        <p style={{fontSize:'20px', fontWeight:'500'}}>Upload Details</p>
        <div className='upload_details'>
          <div className='upload_image'>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: 'none' }} // hide the file input element
            />
            {selectedImage ? (
              <>
                <img src={selectedImage} alt="Selected" height="100px" width="100px" />
                <button className='upload_browse' onClick={handleFileClick}>
                  Change Photo
                </button>
              </>
            ) : (
              <button className='change_browse' onClick={handleFileClick}>
                Browse
              </button>
            )}
          </div>
          <input className='upload_product' type="text" placeholder='Product Type' name='type' value={data.type} onChange={onhandleChange} />
          <input className='upload_name' type="text" placeholder='Name' name='name' value={data.name} onChange={onhandleChange} />
          <input className='upload_price' type="number" placeholder='Price' name='price' value={data.price} onChange={onhandleChange}/>
          <input className='upload_description' type="text" placeholder='Description' name='description' value={data.description} onChange={onhandleChange}/>
          <input className='upload_properties' type='text' placeholder='Properties' name='properties' value={data.properties} onChange={onhandleChange}/>
          <button className='upload_button' onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default UploadDetails;
