// import React from 'react'
import "../CSS/Meal.css"
import * as React from 'react';
import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
import Dinner from "./Dinner";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Meal(props:any) {
  // for tab
  const [value, setValue] = useState(0);
  // for modal data 
  const [currentItem, setCurrentItem] = useState({});
  // for open modal for read more
  const [isOpen, setIsOpen] = useState(false);
  // for open modal for Add to cart
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  // for user meal
  const [Usermeal,setuserMeal] = useState([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }
  
  return (
    <>
      <div className='meal'>
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Breakfast" sx={{ color: "white" }} />
            <Tab label="Lunch" sx={{ color: "white" }} />
            <Tab label="Dinner" sx={{ color: "white" }} />
          </Tabs>
        </Box>
        {value === 0 &&
          <Box>
            <Breakfast isOpen={isOpen} setIsOpen={setIsOpen} currentItem={currentItem} setCurrentItem={setCurrentItem} setIsOpenAdd={setIsOpenAdd} isOpenAdd={isOpenAdd}/>
          </Box>
        }
        {value === 1 &&
          <Box>
            <Lunch isOpen={isOpen} setIsOpen={setIsOpen} currentItem={currentItem} setCurrentItem={setCurrentItem} isOpenAdd={isOpenAdd} setIsOpenAdd={setIsOpenAdd}/>
          </Box>
        }
        {value === 2 &&
          <Box>
            <Dinner isOpen={isOpen} setIsOpen={setIsOpen} currentItem={currentItem} setCurrentItem={setCurrentItem} isOpenAdd={isOpenAdd} setIsOpenAdd={setIsOpenAdd} />
          </Box>
        }
        <Link to=''>
        {/* <Link to='' state={props.cart}> */}
        <button className='addcardicon' onClick={()=>props.setshow(false)}>
        <i className="fa-solid fa-burger"></i>
            <p className='cartcount'>{0}</p>
        </button>
      </Link>
      </div>
    </>
  )
}
