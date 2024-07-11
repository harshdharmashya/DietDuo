import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  breakfast: [],
  lunch: [],
  dinner: []
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    setLunch: (state, action) => {
      state.lunch = action.payload
    },
    setBreakfast: (state, action) => {
      state.breakfast = action.payload
    },
    setDinner: (state, action) => {
      state.dinner = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setBreakfast, setLunch, setDinner } = counterSlice.actions

export default counterSlice.reducer