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
    setBreakfast: (state, action) => {
      state.breakfast = action.payload
    },
    setLunch: (state, action) => {
      state.lunch = action.payload
    },
    setDinner: (state, action) => {
      state.dinner = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setBreakfast, setLunch, setDinner } = counterSlice.actions

export default counterSlice.reducer