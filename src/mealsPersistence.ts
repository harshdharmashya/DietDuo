import { doc, setDoc } from "firebase/firestore";
import { db } from "./component/firebase";
import { MEAL_PLAN_KEYS, type MealSliceState } from "./Redux/Usermeal";

const LS_VERSION = "v2";

/** Full meal plan keyed by slot (Firestore + local mirror shape). */
export function buildMealPlanPayload(meal: MealSliceState): Record<string, unknown[]> {
  const out: Record<string, unknown[]> = {};
  for (const key of MEAL_PLAN_KEYS) {
    const slot = meal[key];
    out[key] = Array.isArray(slot) ? [...slot] : [];
  }
  return out;
}

export function mealPlanLsKey(uid: string | null): string {
  return uid ? `dietduo_meals_${LS_VERSION}_${uid}` : `dietduo_meals_${LS_VERSION}_guest`;
}

export function countMealsInPlan(plan: Record<string, unknown> | null | undefined): number {
  if (!plan || typeof plan !== "object") return 0;
  let n = 0;
  for (const key of MEAL_PLAN_KEYS) {
    const slot = plan[key];
    if (Array.isArray(slot)) n += slot.length;
  }
  return n;
}

/** Prefer the plan snapshot that has more total meals (covers failed Firestore writes). */
export function richerMealPlan(
  a: Record<string, unknown> | null | undefined,
  b: Record<string, unknown> | null | undefined
): Record<string, unknown> | null {
  const ca = countMealsInPlan(a ?? undefined);
  const cb = countMealsInPlan(b ?? undefined);
  if (ca === 0 && cb === 0) return null;
  if (cb > ca) return b ?? null;
  return a ?? b ?? null;
}

export function readMealPlanFromLocalStorage(uid: string | null): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(mealPlanLsKey(uid));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** Save to browser immediately; optionally sync to Firestore for signed-in users. */
export async function persistMeals(uid: string | null, meal: MealSliceState): Promise<void> {
  const mealPlan = buildMealPlanPayload(meal);

  try {
    localStorage.setItem(mealPlanLsKey(uid), JSON.stringify(mealPlan));
  } catch (e) {
    console.warn("Could not mirror meals to localStorage:", e);
  }

  if (!uid) {
    return;
  }

  try {
    await setDoc(doc(db, "Users", uid), { mealPlan }, { merge: true });
  } catch (e) {
    console.error("Firestore meal save failed (backup is still in localStorage):", e);
  }
}
