import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/** Keys that hold meal arrays (matches Add to meal + planner UI). */
export const MEAL_PLAN_KEYS = [
  "Mon_Breakfast",
  "Tus_Breakfast",
  "Wed_Breakfast",
  "Thur_Breakfast",
  "Fri_Breakfast",
  "Sat_Breakfast",
  "Sun_Breakfast",
  "Mon_Lunch",
  "Tus_Lunch",
  "Wed_Lunch",
  "Thur_Lunch",
  "Fri_Lunch",
  "Sat_Lunch",
  "Sun_Lunch",
  "Mon_Dinner",
  "Tus_Dinner",
  "Wed_Dinner",
  "Thur_Dinner",
  "Fri_Dinner",
  "Sat_Dinner",
  "Sun_Dinner",
] as const;

export type MealPlanKey = (typeof MEAL_PLAN_KEYS)[number];

const initialState: Record<MealPlanKey | "filter", unknown[] | unknown> = {
  Mon_Breakfast: [],
  Tus_Breakfast: [],
  Wed_Breakfast: [],
  Thur_Breakfast: [],
  Fri_Breakfast: [],
  Sat_Breakfast: [],
  Sun_Breakfast: [],
  Mon_Lunch: [],
  Tus_Lunch: [],
  Wed_Lunch: [],
  Thur_Lunch: [],
  Fri_Lunch: [],
  Sat_Lunch: [],
  Sun_Lunch: [],
  Mon_Dinner: [],
  Tus_Dinner: [],
  Wed_Dinner: [],
  Thur_Dinner: [],
  Fri_Dinner: [],
  Sat_Dinner: [],
  Sun_Dinner: [],
  filter: [],
};

export type MealSliceState = typeof initialState;

export const counterSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    setDish: (state: MealSliceState, action: PayloadAction<{ data: unknown; day: string }>) => {
      const key = action.payload.day as MealPlanKey;
      if (key in state && Array.isArray(state[key])) {
        (state[key] as unknown[]).push(action.payload.data);
      }
    },
    /** Replace one day slot (e.g. after removing an item). */
    setDayMeals: (state: MealSliceState, action: PayloadAction<{ day: MealPlanKey; items: unknown[] }>) => {
      const { day, items } = action.payload;
      if (day in state) {
        state[day] = items;
      }
    },
    /** Load saved plan from Firestore after login. */
    hydrateMealPlan: (state: MealSliceState, action: PayloadAction<Record<string, unknown>>) => {
      const p = action.payload;
      for (const key of MEAL_PLAN_KEYS) {
        if (Array.isArray(p[key])) {
          state[key] = p[key] as unknown[];
        }
      }
    },
    resetMealPlan: (): MealSliceState => {
      const empty = {} as MealSliceState;
      for (const key of MEAL_PLAN_KEYS) {
        empty[key] = [];
      }
      empty.filter = [];
      return empty;
    },
  },
});

export const { setDish, setDayMeals, hydrateMealPlan, resetMealPlan } = counterSlice.actions;

export default counterSlice.reducer;
