import { useState } from 'react'
import Header from '../component/Header'
import Carousel from '../component/Carousel';
import Meal from '../component/Meal';
import Preference from './Preference';
import Workout from './Workout';
import Services from './Services';
import Footer from './Footer';
import Usermeal from './Usermeal';

export default function Home(props: any) {
  // for toggle user meal component
  const [show, setshow] = useState(true);
  // for modal data 
  const [currentItem, setCurrentItem] = useState({});
  return (
    <>{show ?
      <div>
        <Header setshow={setshow} show={show} user={props.user} setUser={props.setUser} handleLogout={props.handleLogout} />
        <Carousel />
        <Meal setshow={setshow} show={show} currentItem={currentItem} setCurrentItem={setCurrentItem} />
        <Preference />
        <Workout />
        <Services />
        <Footer />
      </div> :
      <Usermeal setshow={setshow} show={show} setCurrentItem={setCurrentItem} currentItem={currentItem} />
    }
    </>
  )
}
