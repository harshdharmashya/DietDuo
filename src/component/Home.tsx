import React, { useState } from 'react'
import Header from '../component/Header'
import Carousel from '../component/Carousel';
import Meal from '../component/Meal';
import Modal from './Modalcard';
import Preference from './Preference';
import Workout from './Workout';
import Services from './Services';
import Footer from './Footer';
import Usermeal from './Usermeal';

export default function Home() {
  // for toggle user meal component
  const [show, setshow] = useState(true);
  return (
    <>{show ?
      <div>
        <Header />
        <Carousel />
        <Meal setshow={setshow} show={show}/>
        <Modal />
        <Preference />
        <Workout />
        <Services />
        <Footer />
      </div> :
      <Usermeal/>
    }
    </>
  )
}
