import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Redux/frontSlice'
import workoutReducer from './Redux/workoutSlice'
import UserReducer from './Redux/Usermeal'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    workout: workoutReducer,
    meal:UserReducer
  },
})