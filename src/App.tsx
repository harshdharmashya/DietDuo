import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import './App.css'
import * as AOS from "aos";
import "aos/dist/aos.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { auth, db } from "./component/firebase";
import { setBreakfast } from './Redux/frontSlice';
import { hydrateMealPlan, resetMealPlan } from './Redux/Usermeal';
import { store } from './store';
import {
  countMealsInPlan,
  readMealPlanFromLocalStorage,
  richerMealPlan,
  persistMeals,
} from './mealsPersistence';
import Home from './component/Home';
import Usermeal from './component/Usermeal';
import User_Workout from './component/Workout/User_Workout';
import About from './component/About';
import Login from './component/login';
import Profile from './component/profile';
import Register from './component/register';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init({
      offset: 320, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1000,
    }
    );
    AOS.refresh();
    const fetchMeals = async (mealType: string) => {
      const response = await fetch(`https://diet-duo-backend.vercel.app/api/recipes?mealType=${mealType}`);
      const data = await response.json();
      // 33f2cc0aa5bd4b88ac7f4b6b73558dfd
      // 6845c5e2d08f447aba1b24ed78bae323
      // console.log(data)
      dispatch(setBreakfast(data))
    };
    fetchMeals('breakfast');
  }, []);

  const [user, setUser] = useState();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (authUser: any) => {
      setUser(authUser);

      if (authUser?.uid) {
        const uid = authUser.uid as string;
        let fromDb: Record<string, unknown> | null = null;

        try {
          const snap = await getDoc(doc(db, 'Users', uid));
          const raw = snap.exists() ? snap.data()?.mealPlan : undefined;
          if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
            fromDb = raw as Record<string, unknown>;
          }
        } catch (e) {
          console.error('Could not load meals from Firestore:', e);
        }

        const fromLs = readMealPlanFromLocalStorage(uid);
        const merged = richerMealPlan(fromDb, fromLs);

        if (merged && countMealsInPlan(merged) > 0) {
          store.dispatch(hydrateMealPlan(merged));
          if (
            fromLs &&
            countMealsInPlan(fromLs) > countMealsInPlan(fromDb ?? undefined)
          ) {
            void persistMeals(uid, store.getState().meal);
          }
        }
      } else {
        const guest = readMealPlanFromLocalStorage(null);
        if (guest && countMealsInPlan(guest) > 0) {
          store.dispatch(hydrateMealPlan(guest));
        } else {
          store.dispatch(resetMealPlan());
        }
      }
    });
    return () => unsub();
  }, []);

  // function for logout
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", toast.error("yes"));
    }
  }
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home user={user} setUser={setUser} handleLogout={handleLogout} />} />
            {user ?
              <>
                <Route path="/meal" element={<Usermeal user={user} setUser={setUser} handleLogout={handleLogout} />} />
                <Route path="/work_out" element={<User_Workout user={user} setUser={setUser} handleLogout={handleLogout} />} />
                <Route path="/about" element={<About user={user} setUser={setUser} handleLogout={handleLogout} />} />
                <Route path="/profile" element={<Profile user={user} setUser={setUser} handleLogout={handleLogout} />} />
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
              </>
              :
              <>
                <Route
                  path="/"
                  element={<Login />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={user ? <Navigate to="/profile" /> : <Register />} />
                <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
              </>
            }
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
