import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { auth } from "./component/firebase";
import { setWork, setDayWorkouts } from "./Redux/workoutSlice";
import { persistWorkouts } from "./workoutPersistence";

export const workoutPersistenceListener = createListenerMiddleware();

workoutPersistenceListener.startListening({
  matcher: isAnyOf(setWork, setDayWorkouts),
  effect: (_action, listenerApi) => {
    const workout = (listenerApi.getState() as any).workout;
    const uid = auth.currentUser?.uid ?? null;
    void persistWorkouts(uid, workout);
  },
});
