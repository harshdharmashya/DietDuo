import React, { useState, useMemo } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Monday_Workout from './Monday_Workout';
import Navbar from '../Navbar';
import "../../CSS/Meal.css"
import "../../CSS/workout.css"
import "../../CSS/Usermeal.css"

const DAY_PREFIX = ["Mon", "Tus", "Wed", "Thur", "Fri", "Sat", "Sun"] as const;
const DAY_LABELS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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

function len(arr: unknown) {
  return Array.isArray(arr) ? arr.length : 0;
}

export default function User_Workout(props: any) {
    const [currentItem, setCurrentItem] = useState({});
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const workout = useSelector((state: any) => state.workout);

    const currentKey = DAY_PREFIX[value];
    const currentWorkouts = useMemo(() => {
        const v = workout[currentKey];
        return Array.isArray(v) ? v : [];
    }, [workout, currentKey]);

    const weekTotal = useMemo(() => {
        let n = 0;
        for (const pre of DAY_PREFIX) {
            n += len(workout[pre]);
        }
        return n;
    }, [workout]);

    return (
        <>
            <Navbar user={props.user} setUser={props.setUser} handleLogout={props.handleLogout} />
            <div className="meal-route usermeal">
                <div className="meal-route-inner">
                    <button className="meal-route-back bg-transparent" onClick={() => {
                        if (props.setshow) props.setshow(true);
                        navigate('/');
                    }}>
                        ← Back to home
                    </button>

                    <motion.header
                        className="meal-hero"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="meal-hero-content">
                            <p className="meal-hero-kicker">Weekly planner</p>
                            <h1 className="meal-hero-title display-font">Your workouts</h1>
                            <p className="meal-hero-desc">
                                Pick a day to review what you added from the home workout browser. Open a card for full details, or remove items you no longer want on this day.
                            </p>
                            <div className="meal-hero-stats">
                                <div className="meal-stat-pill">
                                    <strong>{currentWorkouts.length}</strong>
                                    <span>On {DAY_LABELS[value]}</span>
                                </div>
                                <div className="meal-stat-pill">
                                    <strong>{weekTotal}</strong>
                                    <span>Full week</span>
                                </div>
                            </div>
                        </div>
                    </motion.header>

                    <div className="meal-controls">
                        <p className="meal-section-label">Day</p>
                        <div className="meal-tabs-card">
                            <Box sx={{ width: "100%" }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
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
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentKey}
                            className="meal-content-panel"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Monday_Workout dayKey={currentKey} work={currentWorkouts} currentItem={currentItem} setCurrentItem={setCurrentItem} />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </>
    )
}
