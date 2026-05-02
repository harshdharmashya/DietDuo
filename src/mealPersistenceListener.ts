import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { auth } from "./component/firebase";
import { setDish, setDayMeals } from "./Redux/Usermeal";
import type { MealSliceState } from "./Redux/Usermeal";
import { persistMeals } from "./mealsPersistence";

export const mealPersistenceListener = createListenerMiddleware();

mealPersistenceListener.startListening({
  matcher: isAnyOf(setDish, setDayMeals),
  effect: (_action, listenerApi) => {
    const meal = (listenerApi.getState() as { meal: MealSliceState }).meal;
    const uid = auth.currentUser?.uid ?? null;
    void persistMeals(uid, meal);
  },
});
