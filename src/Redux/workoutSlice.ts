import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  Beginner: [],
  intermediate: [],
  expert: [],
  Mon_Beginner: [],
  Tus_Beginner: [],
  Wed_Beginner: [],
  Thur_Beginner: [],
  Fri_Beginner: [],
  Sat_Beginner: [],
  Sun_Beginner: [],
  Mon_Intermediate:[],
  Tus_Intermediate:[],
  Wed_Intermediate:[],
  Thur_Intermediate:[],
  Fri_Intermediate:[],
  Sat_Intermediate:[],
  Sun_Intermediate:[],
  Mon_Expert:[],
  Tus_Expert:[],
  Wed_Expert:[],
  Thur_Expert:[],
  Fri_Expert:[],
  Sat_Expert:[],
  Sun_Expert:[],
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
    }
  },
})

// Action creators are generated for each case reducer function
export const {setBeginner, setintermediate, setexpert,setWork } = workSlice.actions

export default workSlice.reducer