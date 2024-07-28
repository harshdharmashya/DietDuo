import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  Beginner: [],
  intermediate: [],
  expert: [],
  Mon: [],
  Tus: [],
  Wed: [],
  Thur: [],
  Fri: [],
  Sat: [],
  Sun: [],
  filter: []
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
    },
    setWork: (state: any, action) => {
      state[action.payload.day].push(action.payload.data);
    },
    Workupdate: (state:any,action)=>{
      state.filter = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setBeginner, setintermediate, setexpert,setWork ,Workupdate} = workSlice.actions

export default workSlice.reducer