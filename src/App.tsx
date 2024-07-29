import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import './App.css'
import AOS from "aos";
import "aos/dist/aos.css";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { setBreakfast } from './Redux/frontSlice';
import Home from './component/Home';
import Usermeal from './component/Usermeal';
import User_Workout from './component/Workout/User_Workout';
import About from './component/About';

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
      const response = await fetch(`https://api.spoonacular.com/recipes/random?number=3&tags=${mealType}&apiKey=6845c5e2d08f447aba1b24ed78bae323`);
      const data = await response.json();
      // 33f2cc0aa5bd4b88ac7f4b6b73558dfd
      // 6845c5e2d08f447aba1b24ed78bae323
      // console.log(data)
      dispatch(setBreakfast(data))
    };
    fetchMeals('breakfast');
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/meal" element={<Usermeal />} />
          <Route exact path="/work_out" element={<User_Workout />} />
          <Route exact path="/about" element={<About/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
