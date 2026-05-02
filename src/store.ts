import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Redux/frontSlice'
import workoutReducer from './Redux/workoutSlice'
import UserReducer from './Redux/Usermeal'
import { mealPersistenceListener } from './mealPersistenceListener'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    workout: workoutReducer,
    meal: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(mealPersistenceListener.middleware),
})

export type RootState = ReturnType<typeof store.getState>