import React, { useState, useEffect, useRef } from 'react';
import MainContainer from './MainContainer';
import axiosConfig from '../../api/axiosConfig';
import { flushSync } from 'react-dom';

const Main = ({searchQuery,show}) => {
  const [data, setData] = useState([]);
  const[filterted, setFiletered] = useState([]);
  const[productTypes, setProductType] = useState()
  const rowRefs = useRef([]); // Store references for each row

  // Fetch data from API
  const getData = async () => {
    try {
      const response = await axiosConfig.get("/api/details/allDetails");
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if(show === null){
      const filterItems = data.filter(item => { 
        const matchesQuerry =  item.name?.toLowerCase().includes(searchQuery?.toLowerCase()); 
        return matchesQuerry
      });
      setFiletered(filterItems)
    }else if(show === "Mobile" || show === "Laptop"){
      const filterItems = data.filter(item => { 
        const productQuerry = show ? item.type === show : true;
        return productQuerry
      })
      setFiletered(filterItems)
    }
    
  },[searchQuery, data, show])


  // Split data into chunks of 7 items each
  const chunkData = (array, size) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  const chunkedData = searchQuery || show ? chunkData(filterted, 7) : chunkData(data, 7);

  // Scroll to the right for the specific row
  const rightScroll = (index) => {
    const row = rowRefs.current[index];
    if (row) {
      row.scrollBy({
        top: 0,
        left: 300, // Adjust scrolling distance
        behavior: 'smooth',
      });
    }
  };

  // Scroll to the left for the specific row
  const leftScroll = (index) => {
    const row = rowRefs.current[index];
    if (row) {
      row.scrollBy({
        top: 0,
        left: -300, // Adjust scrolling distance
        behavior: 'smooth',
      });
    }
  };


  return (
    <div className='main_container'>
      {chunkData.length > 0 ? (
        chunkedData.map((rowItems, rowIndex) => (
          <div key={rowIndex} className='row_container'>
            <p className='left_arrow' onClick={() => leftScroll(rowIndex)}>&#10094;</p>
            <div
              className='row'
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {rowItems.map((item, index) => (
                <MainContainer key={index} object={item} searchQuery={searchQuery}/>
              ))}
            </div>
            <p className='right_arrow' onClick={() => rightScroll(rowIndex)}>&#10095;</p>
          </div>
        ))
       ) : (<p className='item_not_found'>Item is not found</p>)
      }
      
    </div>
  );
};

export default Main;
