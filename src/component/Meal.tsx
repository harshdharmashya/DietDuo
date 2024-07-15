// import React from 'react'
import "../CSS/Meal.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
import Dinner from "./Dinner";
import { useState } from "react";

export default function Meal(props:any) {
  const [value, setValue] = useState(0);
  const [currentItem, setCurrentItem] = useState({});
  const [isOpen, setIsOpen] = useState(false);

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
            <Breakfast isOpen={isOpen} setIsOpen={setIsOpen} currentItem={currentItem} setCurrentItem={setCurrentItem}/>
          </Box>
        }
        {value === 1 &&
          <Box>
            <Lunch isOpen={isOpen} setIsOpen={setIsOpen} currentItem={currentItem} setCurrentItem={setCurrentItem}/>
          </Box>
        }
        {value === 2 &&
          <Box>
            <Dinner isOpen={isOpen} setIsOpen={setIsOpen} currentItem={currentItem} setCurrentItem={setCurrentItem}/>
          </Box>
        }
      </div>
    </>
  )
}
