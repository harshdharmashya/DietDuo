import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  Mon_Breakfast: [],
  Tus_Breakfast: [],
  Wed_Breakfast: [],
  Thur_Breakfast: [],
  Fri_Breakfast: [],
  Sat_Breakfast: [],
  Sun_Breakfast: [],
  Mon_Lunch:[],
  Tus_Lunch:[],
  Wed_Lunch:[],
  Thur_Lunch:[],
  Fri_Lunch:[],
  Sat_Lunch:[],
  Sun_Lunch:[],
  Mon_Dinner:[],
  Tus_Dinner:[],
  Wed_Dinner:[],
  Thur_Dinner:[],
  Fri_Dinner:[],
  Sat_Dinner:[],
  Sun_Dinner:[],
}

export const counterSlice = createSlice({
  name: 'meal',
  initialState,
  reducers: {
    setDish: (state: any, action) => {
      state[action.payload.day].push(action.payload.data);
    }
  },
})

// Action creators are generated for each case reducer function
export const { setDish } = counterSlice.actions

export default counterSlice.reducer