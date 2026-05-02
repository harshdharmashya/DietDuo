import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { User } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import default_user from "../Images/user image default.png";
import Navbar from "./Navbar";
import type { RootState } from "../store";
import "../CSS/Profile.css";

type FirestoreUser = {
  email?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
};

const MEAL_KEYS = [
  "Mon_Breakfast", "Tus_Breakfast", "Wed_Breakfast", "Thur_Breakfast", "Fri_Breakfast", "Sat_Breakfast", "Sun_Breakfast",
  "Mon_Lunch", "Tus_Lunch", "Wed_Lunch", "Thur_Lunch", "Fri_Lunch", "Sat_Lunch", "Sun_Lunch",
  "Mon_Dinner", "Tus_Dinner", "Wed_Dinner", "Thur_Dinner", "Fri_Dinner", "Sat_Dinner", "Sun_Dinner",
] as const;

const WORKOUT_DAY_KEYS = ["Mon", "Tus", "Wed", "Thur", "Fri", "Sat", "Sun"] as const;

function countMealsPlanned(meal: RootState["meal"]) {
  return MEAL_KEYS.reduce((acc, key) => {
    const slot = meal[key as keyof typeof meal];
    return acc + (Array.isArray(slot) ? slot.length : 0);
  }, 0);
}

function countWorkoutsScheduled(workout: RootState["workout"]) {
  return WORKOUT_DAY_KEYS.reduce((acc, key) => {
    const slot = workout[key as keyof typeof workout];
    return acc + (Array.isArray(slot) ? slot.length : 0);
  }, 0);
}

function formatFirebaseDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "—" : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function formatRelative(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 14) return `${days}d ago`;
  return formatFirebaseDate(iso);
}

function insightMessage(meals: number, workouts: number) {
  if (meals === 0 && workouts === 0) {
    return "Your planner is empty — add breakfast, lunch, or dinner slots from the Meal page and schedule workouts for the week to see everything reflected here.";
  }
  if (meals > 0 && workouts === 0) {
    return `Nice — you’ve lined up ${meals} meal${meals === 1 ? "" : "s"} across your week. Add workouts from Work-out to balance nutrition with movement.`;
  }
  if (meals === 0 && workouts > 0) {
    return `You’ve scheduled ${workouts} workout${workouts === 1 ? "" : "s"} this week. Add meals to stay fueled for those sessions.`;
  }
  return `You’re on a roll: ${meals} planned meal${meals === 1 ? "" : "s"} and ${workouts} workout${workouts === 1 ? "" : "s"} on your calendar. Adjust anytime from Meal or Work-out.`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

const heroContainer = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1, delayChildren: 0.06, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const statsContainer = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.09 },
  },
};

export default function Profile(props: { user?: unknown; setUser?: unknown; handleLogout: () => void | Promise<void> }) {
  const mealState = useSelector((s: RootState) => s.meal);
  const workoutState = useSelector((s: RootState) => s.workout);

  const mealsCount = useMemo(() => countMealsPlanned(mealState), [mealState]);
  const workoutsCount = useMemo(() => countWorkoutsScheduled(workoutState), [workoutState]);

  const [loading, setLoading] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [docData, setDocData] = useState<FirestoreUser | null>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      setFirebaseUser(user);
      if (!user) {
        setDocData(null);
        setLoading(false);
        return;
      }
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDocData(docSnap.data() as FirestoreUser);
        } else {
          setDocData({ email: user.email ?? undefined, firstName: "", lastName: "", photo: "" });
        }
      } catch {
        setDocData({ email: user.email ?? undefined, firstName: "", lastName: "", photo: "" });
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  const displayName = useMemo(() => {
    const fn = docData?.firstName?.trim() ?? "";
    const ln = docData?.lastName?.trim() ?? "";
    const combined = [fn, ln].filter(Boolean).join(" ");
    if (combined) return combined;
    const em = firebaseUser?.email ?? docData?.email ?? "";
    if (em) return em.split("@")[0] ?? "Member";
    return "Member";
  }, [docData, firebaseUser]);

  const email = firebaseUser?.email ?? docData?.email ?? "";
  const avatarSrc =
    docData?.photo && (docData.photo.startsWith("http") || docData.photo.startsWith("data:"))
      ? docData.photo
      : default_user;

  const memberSince = formatFirebaseDate(firebaseUser?.metadata?.creationTime);
  const lastSignIn = formatFirebaseDate(firebaseUser?.metadata?.lastSignInTime);
  const lastSignInRelative = formatRelative(firebaseUser?.metadata?.lastSignInTime);
  const verified = firebaseUser?.emailVerified ?? false;
  const uidShort = firebaseUser?.uid ? `${firebaseUser.uid.slice(0, 6)}…${firebaseUser.uid.slice(-4)}` : "—";

  if (loading) {
    return (
      <>
        <Navbar user={props.user} setUser={props.setUser} handleLogout={props.handleLogout} />
        <div className="profile-page">
          <div className="profile-loading">
            <div className="profile-loading-pulse" aria-hidden />
            <p>Loading your profile…</p>
          </div>
        </div>
      </>
    );
  }

  if (!firebaseUser) {
    return (
      <>
        <Navbar user={props.user} setUser={props.setUser} handleLogout={props.handleLogout} />
        <div className="profile-page">
          <motion.div className="profile-shell profile-guest" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="display-font" style={{ marginTop: 0 }}>Sign in to view your profile</h2>
            <p style={{ opacity: 0.85, marginBottom: "1.25rem" }}>
              See your account details, planner stats, and quick links after you log in.
            </p>
            <Link to="/login" className="profile-btn profile-btn--primary">
              Go to login
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar user={props.user} setUser={props.setUser} handleLogout={props.handleLogout} />
      <div className="profile-page">
        <div className="profile-shell">
          <Link to="/" className="profile-back-link">
            ← Back to home
          </Link>

          <motion.section
            className="profile-hero"
            variants={heroContainer}
            initial="hidden"
            animate="show"
          >
            <motion.div className="profile-hero-inner" variants={fadeUp}>
              <div className="profile-avatar-wrap">
                <div className="profile-avatar-ring" aria-hidden />
                <img className="profile-avatar" src={avatarSrc} width={132} height={132} alt={`${displayName} profile`} />
              </div>
              <div className="profile-hero-text">
                <p className="profile-kicker">Your DietDuo space</p>
                <h1 className="profile-name">{displayName}</h1>
                <div className="profile-email-row">
                  <p className="profile-email">{email || "No email on file"}</p>
                  {verified ? (
                    <span className="profile-badge profile-badge--ok">Verified</span>
                  ) : (
                    <span className="profile-badge profile-badge--warn">Unverified</span>
                  )}
                </div>
                <div className="profile-hero-actions">
                  <Link to="/meal" className="profile-btn profile-btn--primary">
                    Plan meals
                  </Link>
                  <Link to="/work_out" className="profile-btn profile-btn--ghost">
                    Work outs
                  </Link>
                  <button type="button" className="profile-btn profile-btn--danger" onClick={() => props.handleLogout()}>
                    Log out
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="profile-stats"
              variants={statsContainer}
            >
              <motion.div className="profile-stat-card" variants={fadeUp} whileHover={{ y: -4 }}>
                <p className="profile-stat-label">Meals planned</p>
                <p className="profile-stat-value">{mealsCount}</p>
                <p className="profile-stat-hint">Across your breakfast, lunch & dinner slots this week.</p>
              </motion.div>
              <motion.div className="profile-stat-card" variants={fadeUp} whileHover={{ y: -4 }}>
                <p className="profile-stat-label">Workouts set</p>
                <p className="profile-stat-value">{workoutsCount}</p>
                <p className="profile-stat-hint">Sessions placed on your weekly workout calendar.</p>
              </motion.div>
              <motion.div className="profile-stat-card" variants={fadeUp} whileHover={{ y: -4 }}>
                <p className="profile-stat-label">Member since</p>
                <p className="profile-stat-value" style={{ fontSize: "1.35rem", paddingTop: "0.15rem" }}>
                  {memberSince}
                </p>
                <p className="profile-stat-hint">Thank you for growing with DietDuo.</p>
              </motion.div>
            </motion.div>
          </motion.section>

          <motion.div
            className="profile-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="profile-panel">
              <h2 className="profile-panel-title">Account</h2>
              <dl className="profile-dl">
                <div>
                  <dt className="profile-dt">Display name</dt>
                  <dd className="profile-dd">{displayName}</dd>
                </div>
                <div>
                  <dt className="profile-dt">User ID</dt>
                  <dd className="profile-dd" title={firebaseUser.uid}>
                    {uidShort}
                  </dd>
                </div>
                <div>
                  <dt className="profile-dt">Last sign-in</dt>
                  <dd className="profile-dd">
                    {lastSignIn}
                    {lastSignInRelative ? ` (${lastSignInRelative})` : ""}
                  </dd>
                </div>
                <div>
                  <dt className="profile-dt">Email status</dt>
                  <dd className="profile-dd">{verified ? "Verified" : "Not verified"}</dd>
                </div>
              </dl>
            </div>
            <div className="profile-panel">
              <h2 className="profile-panel-title">This week</h2>
              <dl className="profile-dl">
                <div>
                  <dt className="profile-dt">Meals in planner</dt>
                  <dd className="profile-dd">{mealsCount}</dd>
                </div>
                <div>
                  <dt className="profile-dt">Workouts scheduled</dt>
                  <dd className="profile-dd">{workoutsCount}</dd>
                </div>
                <div>
                  <dt className="profile-dt">Quick open</dt>
                  <dd className="profile-dd" style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", justifyContent: "flex-end" }}>
                    <Link to="/meal" style={{ color: "#e8f5c8" }}>Meals</Link>
                    <span style={{ opacity: 0.4 }}>·</span>
                    <Link to="/work_out" style={{ color: "#e8f5c8" }}>Work out</Link>
                  </dd>
                </div>
              </dl>
            </div>
          </motion.div>

          <motion.div
            className="profile-insight"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.45 }}
          >
            <p>{insightMessage(mealsCount, workoutsCount)}</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
