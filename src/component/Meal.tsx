// import React from 'react'
import "../CSS/Meal.css"
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
import Dinner from "./Dinner";
import { Numbers } from "@mui/icons-material";


export default function Meal(props:any) {
  const [value, setValue] = React.useState(0);
  
  console.log(props)
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
            <Breakfast/>
          </Box>
        }
        {value === 1 &&
          <Box>
            <Lunch/>
          </Box>
        }
        {value === 2 &&
          <Box>
            <Dinner />
          </Box>
        }
        {/* <p className='meal-btn'>
          <button type="button" className="btn btn-outline-light active">Breakfast</button>
          <button type="button" className="btn btn-outline-light">Lunch</button>
          <button type="button" className="btn btn-outline-light">Dinner</button>
        </p>
        <div className='active-meal'>
          <div className="card mb-3">
            <img src="..." className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title text-dark">Card title</h5>
                <p className="card-text text-dark">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
          </div>
        </div> */}
      </div>
    </>
  )
}
