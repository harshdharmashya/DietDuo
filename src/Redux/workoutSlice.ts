import { createSlice } from '@reduxjs/toolkit'

export const WORKOUT_PLAN_KEYS = [
  "Mon", "Tus", "Wed", "Thur", "Fri", "Sat", "Sun"
] as const;

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
    },
    setDayWorkouts: (state: any, action) => {
      const { day, items } = action.payload;
      if (day in state) {
        state[day] = items;
      }
    },
    hydrateWorkoutPlan: (state: any, action) => {
      const p = action.payload;
      for (const key of WORKOUT_PLAN_KEYS) {
        if (Array.isArray(p[key])) {
          state[key] = p[key];
        }
      }
    },
    resetWorkoutPlan: (state: any) => {
      for (const key of WORKOUT_PLAN_KEYS) {
        state[key] = [];
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const {setBeginner, setintermediate, setexpert,setWork ,Workupdate, setDayWorkouts, hydrateWorkoutPlan, resetWorkoutPlan} = workSlice.actions

export default workSlice.reducer