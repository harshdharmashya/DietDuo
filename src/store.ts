import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Redux/frontSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})