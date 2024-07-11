import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useDispatch } from 'react-redux';
import './App.css'
import AOS from "aos";
import "aos/dist/aos.css";
import Header from './component/Header'
import Carousel from './component/Carousel';
import Meal from './component/Meal';
import { setBreakfast, setLunch, setDinner } from './Redux/frontSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init({
      offset: 320, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 2000,
    }
    );
    AOS.refresh();
    const fetchMeals = async (mealType: string) => {
      const response = await fetch(`https://api.spoonacular.com/recipes/random?number=3&tags=${mealType}&apiKey=33f2cc0aa5bd4b88ac7f4b6b73558dfd`);
      const data = await response.json();
      if(mealType == 'breakfast'){
        dispatch(setBreakfast(data))
      }else if(mealType == 'lunch'){
        dispatch(setLunch(data))
      }else{
        dispatch(setDinner(data))
      }
    };

    fetchMeals('breakfast');
    fetchMeals('lunch');
    fetchMeals('dinner');
  }, []);
  return (
    <>
      <Header />
      <Carousel />
      <Meal />
    </>
  )
}

export default App
