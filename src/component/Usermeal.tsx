import React, { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import Monday from "./Day/Monday";
import Navbar from "./Navbar";
import type { RootState } from "../store";
import type { MealPlanKey } from "../Redux/Usermeal";
import "../CSS/Usermeal.css";

const DAY_PREFIX = ["Mon", "Tus", "Wed", "Thur", "Fri", "Sat", "Sun"] as const;
const DAY_LABELS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const PERIODS = ["Breakfast", "Lunch", "Dinner"] as const;

const tabsSx = {
  "& .MuiTab-root": {
    color: "rgba(255,255,255,0.55)",
    fontWeight: 600,
    fontSize: "0.82rem",
    minHeight: 44,
    textTransform: "none" as const,
    transition: "color 0.2s ease",
  },
  "& .Mui-selected": {
    color: "#e8f5c8 !important",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "#cddc39",
    height: 3,
    borderRadius: "3px 3px 0 0",
  },
  "& .MuiTabScrollButton-root": {
    color: "rgba(255,255,255,0.7)",
  },
};

const periodTabsSx = {
  ...tabsSx,
  "& .MuiTab-root": {
    ...tabsSx["& .MuiTab-root"],
    fontSize: "0.88rem",
    minHeight: 48,
  },
};

function len(arr: unknown) {
  return Array.isArray(arr) ? arr.length : 0;
}

export default function Usermeal(props: {
  user?: unknown;
  setUser?: unknown;
  /** Only required on full-page routes (/meal); optional when embedded from Home. */
  handleLogout?: () => void | Promise<void>;
  setshow?: (v: boolean) => void;
  show?: boolean;
  setCurrentItem?: Dispatch<SetStateAction<unknown>>;
  currentItem?: unknown;
}) {
  const [dayTab, setDayTab] = useState(0);
  const [periodTab, setPeriodTab] = useState(0);
  const [localItem, setLocalItem] = useState<unknown>({});

  const meal = useSelector((s: RootState) => s.meal);

  const currentKey = useMemo((): MealPlanKey => {
    const prefix = DAY_PREFIX[dayTab];
    const period = PERIODS[periodTab];
    return `${prefix}_${period}` as MealPlanKey;
  }, [dayTab, periodTab]);

  const currentMeals = useMemo(() => {
    const v = meal[currentKey];
    return Array.isArray(v) ? v : [];
  }, [meal, currentKey]);

  const dayTotal = useMemo(() => {
    const p = DAY_PREFIX[dayTab];
    return (
      len(meal[`${p}_Breakfast` as keyof typeof meal]) +
      len(meal[`${p}_Lunch` as keyof typeof meal]) +
      len(meal[`${p}_Dinner` as keyof typeof meal])
    );
  }, [meal, dayTab]);

  const weekTotal = useMemo(() => {
    let n = 0;
    for (const pre of DAY_PREFIX) {
      n +=
        len(meal[`${pre}_Breakfast` as keyof typeof meal]) +
        len(meal[`${pre}_Lunch` as keyof typeof meal]) +
        len(meal[`${pre}_Dinner` as keyof typeof meal]);
    }
    return n;
  }, [meal]);

  const handleDayChange = (_e: React.SyntheticEvent, v: number) => {
    setDayTab(v);
  };

  const handlePeriodChange = (_e: React.SyntheticEvent, v: number) => {
    setPeriodTab(v);
  };

  const setCurrentItem = props.setCurrentItem ?? setLocalItem;
  const currentItem = props.currentItem ?? localItem;

  return (
    <>
      <Navbar
        user={props.user}
        setUser={props.setUser}
        handleLogout={props.handleLogout ?? (() => undefined)}
      />
      <div className="meal-route usermeal">
        <div className="meal-route-inner">
          <Link to="/" className="meal-route-back">
            ← Back to home
          </Link>

          <motion.header
            className="meal-hero"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="meal-hero-content">
              <p className="meal-hero-kicker">Weekly planner</p>
              <h1 className="meal-hero-title display-font">Your meals</h1>
              <p className="meal-hero-desc">
                Pick a day and meal type to review what you added from the home meal browser. Open a card for full
                nutrition flags, or remove items you no longer want on this day.
              </p>
              <div className="meal-hero-stats">
                <div className="meal-stat-pill">
                  <strong>{dayTotal}</strong>
                  <span>On {DAY_LABELS[dayTab]}</span>
                </div>
                <div className="meal-stat-pill">
                  <strong>{weekTotal}</strong>
                  <span>Full week</span>
                </div>
                <div className="meal-stat-pill">
                  <strong>{currentMeals.length}</strong>
                  <span>{PERIODS[periodTab]}</span>
                </div>
              </div>
            </div>
          </motion.header>

          <div className="meal-controls">
            <p className="meal-section-label">Day</p>
            <div className="meal-tabs-card">
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={dayTab}
                  onChange={handleDayChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="Weekday"
                  sx={tabsSx}
                >
                  {DAY_LABELS.map((label) => (
                    <Tab key={label} label={label.slice(0, 3)} />
                  ))}
                </Tabs>
              </Box>
            </div>

            <p className="meal-section-label">Meal type</p>
            <div className="meal-tabs-card meal-tabs-card--period">
              <Box sx={{ width: "100%" }}>
                <Tabs
                  value={periodTab}
                  onChange={handlePeriodChange}
                  variant="fullWidth"
                  aria-label="Meal period"
                  sx={periodTabsSx}
                >
                  <Tab label="Breakfast" />
                  <Tab label="Lunch" />
                  <Tab label="Dinner" />
                </Tabs>
              </Box>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentKey}`}
              className="meal-content-panel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <Monday
                meal={currentMeals}
                mealDayKey={currentKey}
                setCurrentItem={setCurrentItem}
                currentItem={currentItem}
                sectionTitle={`${DAY_LABELS[dayTab]} · ${PERIODS[periodTab]}`}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {props.setshow ? (
          <button type="button" className="meal-goback-btn" onClick={() => props.setshow!(true)}>
            Go back
          </button>
        ) : null}
      </div>
    </>
  );
}
