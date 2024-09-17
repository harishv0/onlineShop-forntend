import React, { useEffect, useState } from 'react'
import './MainContainer.css'
import img from '../../Assets/OPAC.jpeg'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Box, Card, Paper, Typography } from '@mui/material'

const MainContainer = ({object}) => {
  const[value, setValue] = useState("")
  const navigate = useNavigate()
  const cookies = new Cookies
  const isPostAvailable = (data) => {
    return data === ""? false : true
  }
const handleClick = () => {
  setValue(object.name)
  cookies.set("value", object?.name)
  navigate('/details')
}


console.log(value)
  return (
    <Box gap={10}className='product'>
      <div className='product_container'>
      {isPostAvailable(object.images)?
          <img className='product_img' src={object.images} alt={img} onClick={handleClick}/> : <span></span>
        }
        <Typography className='product_name'>{object?.name}</Typography>
        <Typography className='product_price'>&#8377;{object?.price}</Typography>
       
      </div>
    </Box>
  )
}

export default MainContainer
