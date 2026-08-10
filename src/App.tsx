import { useEffect } from 'react'
import axios from 'axios';
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { db } from "./component/firebase";
import { setBreakfast } from './Redux/frontSlice';
import { hydrateMealPlan, resetMealPlan } from './Redux/Usermeal';
import { store } from './store';
import {
  countMealsInPlan,
  readMealPlanFromLocalStorage,
  richerMealPlan,
  persistMeals,
} from './mealsPersistence';
import {
  countWorkoutsInPlan,
  readWorkoutPlanFromLocalStorage,
  richerWorkoutPlan,
  persistWorkouts,
} from './workoutPersistence';
import { hydrateWorkoutPlan, resetWorkoutPlan } from './Redux/workoutSlice';
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
      offset: 320,
      delay: 0,
      duration: 1000,
    }
    );
    AOS.refresh();
    const fetchMeals = async (mealType: string) => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/recipes?mealType=${mealType}`);
      const data = response.data;
      dispatch(setBreakfast(data))
    };
    fetchMeals('breakfast');
  }, []);

  const [user, setUser] = useState<any>();
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      let authUser: any = null;
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          authUser = payload.user || payload;
          setUser(authUser);
        } catch (error) {
          console.error("Token invalid or expired", error);
          localStorage.removeItem('token');
          setUser(undefined);
        }
      } else {
        setUser(undefined);
      }

      const uid = authUser?.uid || authUser?._id || authUser?.id;

      if (uid) {
        let fromDb: Record<string, unknown> | null = null;
        let fromDbWorkout: Record<string, unknown> | null = null;

        try {
          const snap = await getDoc(doc(db, 'Users', uid));
          const raw = snap.exists() ? snap.data()?.mealPlan : undefined;
          if (raw && typeof raw === 'object' && !Array.isArray(raw)) {
            fromDb = raw as Record<string, unknown>;
          }
          const rawWorkout = snap.exists() ? snap.data()?.workoutPlan : undefined;
          if (rawWorkout && typeof rawWorkout === 'object' && !Array.isArray(rawWorkout)) {
            fromDbWorkout = rawWorkout as Record<string, unknown>;
          }
        } catch (e) {
          console.error('Could not load data from Firestore:', e);
        }

        try {
          const mealRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/schedule/meal`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (mealRes.data && mealRes.data.success && mealRes.data.data) {
            fromDb = mealRes.data.data as Record<string, unknown>;
          }
        } catch (e) {
          console.error('Could not load meal schedule from backend:', e);
        }

        try {
          const workoutRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/schedule/workout`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (workoutRes.data && workoutRes.data.success && workoutRes.data.data) {
            fromDbWorkout = workoutRes.data.data as Record<string, unknown>;
          }
        } catch (e) {
          console.error('Could not load workout schedule from backend:', e);
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

        const fromLsWorkout = readWorkoutPlanFromLocalStorage(uid);
        const mergedWorkout = richerWorkoutPlan(fromDbWorkout, fromLsWorkout);
        if (mergedWorkout && countWorkoutsInPlan(mergedWorkout) > 0) {
          store.dispatch(hydrateWorkoutPlan(mergedWorkout));
          if (
            fromLsWorkout &&
            countWorkoutsInPlan(fromLsWorkout) > countWorkoutsInPlan(fromDbWorkout ?? undefined)
          ) {
            void persistWorkouts(uid, store.getState().workout);
          }
        }
      } else {
        const guest = readMealPlanFromLocalStorage(null);
        if (guest && countMealsInPlan(guest) > 0) {
          store.dispatch(hydrateMealPlan(guest));
        } else {
          store.dispatch(resetMealPlan());
        }

        const guestWorkout = readWorkoutPlanFromLocalStorage(null);
        if (guestWorkout && countWorkoutsInPlan(guestWorkout) > 0) {
          store.dispatch(hydrateWorkoutPlan(guestWorkout));
        } else {
          store.dispatch(resetWorkoutPlan());
        }
      }
    };
    checkAuth();
  }, []);

  // function for logout
  async function handleLogout() {
    try {
      localStorage.removeItem('token');
      setUser(undefined);
      window.location.href = "/login";
      console.log("User logged out successfully!");
      toast.success("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Error logging out");
    }
  }
  return (
    <>
      <ToastContainer />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home user={user} setUser={setUser} handleLogout={handleLogout} />} />
            <Route path="/about" element={<About user={user} setUser={setUser} handleLogout={handleLogout} />} />
            {user ?
              <>
                <Route path="/meal" element={<Usermeal user={user} setUser={setUser} handleLogout={handleLogout} />} />
                <Route path="/work_out" element={<User_Workout user={user} setUser={setUser} handleLogout={handleLogout} />} />
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
