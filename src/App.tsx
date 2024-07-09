import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AOS from "aos";
import "aos/dist/aos.css";
import Header from './component/Header'
import Carousel from './component/Carousel';

function App() {
  useEffect(() => {
    AOS.init({
      offset: 320, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 2000,}
    );
    AOS.refresh();
  }, []);
  return (
    <>
      <Header/>
      <Carousel/>
    </>
  )
}

export default App
