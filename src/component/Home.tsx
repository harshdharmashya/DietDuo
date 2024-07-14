import React, { useState } from 'react'
import Header from '../component/Header'
import Carousel from '../component/Carousel';
import Meal from '../component/Meal';

export default function Home() {
    const [show,setshow]=useState(true);

  return (
    <>
      <Header />
      <Carousel />
      <Meal />
    </>
  )
}
