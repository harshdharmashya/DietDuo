import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  Beginner: [],
  intermediate: [],
  expert: []
}

export const workSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    setBeginner: (state, action) => {
      state.Beginner = action.payload
    },
    setintermediate: (state, action) => {
      state.intermediate = action.payload
    },
    setexpert: (state, action) => {
      state.expert = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setBeginner, setintermediate, setexpert } = workSlice.actions

export default workSlice.reducer