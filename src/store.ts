import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Redux/frontSlice'
import workoutReducer from './Redux/workoutSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    workout: workoutReducer
  },
})