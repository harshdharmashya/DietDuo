import * as React from 'react';
import "../CSS/Meal.css"
import { Box } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Breakfast from "./Breakfast";
import Lunch from "./Lunch";
import Dinner from "./Dinner";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Drumstick, Leaf, UtensilsCrossed } from 'lucide-react';

export default function Meal(props: any) {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [foodType, setFoodType] = useState<"veg" | "non-veg">("veg");
  // for user meal
  // const [Usermeal, setuserMeal] = useState([]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  return (
    <>
      <div className="meal" id="meals">
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Breakfast" sx={{ color: "white" }} />
            <Tab label="Lunch" sx={{ color: "white" }} />
            <Tab label="Dinner" sx={{ color: "white" }} />
          </Tabs>
          <div className="relative inline-flex items-center rounded-full bg-gray-100 p-1 shadow-inner ml-[140px]!">
            {/* Sliding Background Indicator */}
            <div
              className={`absolute h-[calc(100%-8px)] w-[calc(50%-8px)] rounded-full transition-all duration-300 ease-in-out ${foodType === "veg"
                ? "translate-x-1 bg-green-500 shadow-lg shadow-green-200"
                : "translate-x-[calc(100%+4px)] bg-red-500 shadow-lg shadow-red-200"
                }`}
            />

            <button
              onClick={() => setFoodType("veg")}
              className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${foodType === "veg" ? "text-white" : "text-green-500! hover:text-green-900"
                }`}
            >
              <Leaf size={16} color={foodType === "veg" ? "white" : "green"} />
              Veg
            </button>

            <button
              onClick={() => setFoodType("non-veg")}
              className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${foodType === "non-veg" ? "text-white" : "text-red-500! hover:text-red-900"
                }`}
            >
              <Drumstick size={16} color={foodType === "non-veg" ? "white" : "red"} />
              Non-Veg
            </button>
          </div>
        </Box>
        {value === 0 &&
          <Box>
            <Breakfast isOpen={isOpen} setIsOpen={setIsOpen} currentItem={props.currentItem} setCurrentItem={props.setCurrentItem} setIsOpenAdd={setIsOpenAdd} isOpenAdd={isOpenAdd} foodType={foodType} />
          </Box>
        }
        {value === 1 &&
          <Box>
            <Lunch isOpen={isOpen} setIsOpen={setIsOpen} currentItem={props.currentItem} setCurrentItem={props.setCurrentItem} isOpenAdd={isOpenAdd} setIsOpenAdd={setIsOpenAdd} foodType={foodType} />
          </Box>
        }
        {value === 2 &&
          <Box>
            <Dinner isOpen={isOpen} setIsOpen={setIsOpen} currentItem={props.currentItem} setCurrentItem={props.setCurrentItem} isOpenAdd={isOpenAdd} setIsOpenAdd={setIsOpenAdd} foodType={foodType} />
          </Box>
        }
        <Link to=''>
          {/* <Link to='' state={props.cart}> */}
          {!!localStorage.getItem('token') && (
            <button className='addcardicon' onClick={() => props.setshow(false)}>
              <UtensilsCrossed />
            </button>
          )}
        </Link>
      </div>
    </>
  )
}
