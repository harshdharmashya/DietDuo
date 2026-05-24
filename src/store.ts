import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Redux/frontSlice'
import workoutReducer from './Redux/workoutSlice'
import UserReducer from './Redux/Usermeal'
import { mealPersistenceListener } from './mealPersistenceListener'
import { workoutPersistenceListener } from './workoutPersistenceListener'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    workout: workoutReducer,
    meal: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(mealPersistenceListener.middleware, workoutPersistenceListener.middleware),
})

export type RootState = ReturnType<typeof store.getState>