import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  
}

export const counterSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    // setBreakfast: (state, action) => {
    //   state.breakfast = action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const {} = counterSlice.actions

export default counterSlice.reducer