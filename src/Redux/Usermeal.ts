import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Mon: [],
  Tus: [],
  Wed: [],
  Thur: [],
  Fri: [],
  Sat: [],
  Sun: []
}

export const counterSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    setDish: (state: any, action) => {
      state[action.payload.day].push(action.payload.data)
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDish } = counterSlice.actions

export default counterSlice.reducer