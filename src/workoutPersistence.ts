import { doc, setDoc } from "firebase/firestore";
import { db } from "./component/firebase";
import { WORKOUT_PLAN_KEYS } from "./Redux/workoutSlice";

const LS_VERSION = "v2";

export function buildWorkoutPlanPayload(workout: any): Record<string, unknown[]> {
  const out: Record<string, unknown[]> = {};
  for (const key of WORKOUT_PLAN_KEYS) {
    const slot = workout[key];
    out[key] = Array.isArray(slot) ? [...slot] : [];
  }
  return out;
}

export function workoutPlanLsKey(uid: string | null): string {
  return uid ? `dietduo_workouts_${LS_VERSION}_${uid}` : `dietduo_workouts_${LS_VERSION}_guest`;
}

export function countWorkoutsInPlan(plan: Record<string, unknown> | null | undefined): number {
  if (!plan || typeof plan !== "object") return 0;
  let n = 0;
  for (const key of WORKOUT_PLAN_KEYS) {
    const slot = plan[key];
    if (Array.isArray(slot)) n += slot.length;
  }
  return n;
}

export function richerWorkoutPlan(
  a: Record<string, unknown> | null | undefined,
  b: Record<string, unknown> | null | undefined
): Record<string, unknown> | null {
  const ca = countWorkoutsInPlan(a ?? undefined);
  const cb = countWorkoutsInPlan(b ?? undefined);
  if (ca === 0 && cb === 0) return null;
  if (cb > ca) return b ?? null;
  return a ?? b ?? null;
}

export function readWorkoutPlanFromLocalStorage(uid: string | null): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(workoutPlanLsKey(uid));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function persistWorkouts(uid: string | null, workout: any): Promise<void> {
  const workoutPlan = buildWorkoutPlanPayload(workout);

  try {
    localStorage.setItem(workoutPlanLsKey(uid), JSON.stringify(workoutPlan));
  } catch (e) {
    console.warn("Could not mirror workouts to localStorage:", e);
  }

  if (!uid) {
    return;
  }

  try {
    await setDoc(doc(db, "Users", uid), { workoutPlan }, { merge: true });
  } catch (e) {
    console.error("Firestore workout save failed:", e);
  }
}
