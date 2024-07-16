import React, { useState } from 'react'
import Header from '../component/Header'
import Carousel from '../component/Carousel';
import Meal from '../component/Meal';
import Modal from './Modalcard';
import Preference from './Preference';

export default function Home() {

  return (
    <>
      <Header />
      <Carousel />
      <Meal />
      <Modal/>
      <Preference/>
    </>
  )
}
