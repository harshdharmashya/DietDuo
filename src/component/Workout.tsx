import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Box, Tab, Tabs } from '@mui/material'
import Beginner from "./Workout/Beginner"
import Intermediate from './Workout/Intermediate'
import Expert from './Workout/Expert'
import "../CSS/Meal.css"
import "../CSS/workout.css"
export default function Workout() {
    const [value, setValue] = useState(0);
    // for data transfer to the modal
    const [currentItem, setCurrentItem] = useState({});
    // for open Read more modal
    const [isOpen, setIsOpen] = useState(false);


    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }
    return (
        <>
            <div className='work'>
                <motion.div
                  className='headline-work headline-extra display-font'
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  Work out for you
                </motion.div>
                <Box sx={{ width: '100%' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="beginner" sx={{ color: "white" }} />
                        <Tab label="intermediate" sx={{ color: "white" }} />
                        <Tab label="expert" sx={{ color: "white" }} />
                    </Tabs>
                </Box>
                {value === 0 &&
                    <Box>
                        <Beginner isOpen={isOpen} setIsOpen={setIsOpen} currentItem={currentItem} setCurrentItem={setCurrentItem} />
                    </Box>
                }
                {value === 1 &&
                    <Box>
                        <Intermediate isOpen={isOpen} setIsOpen={setIsOpen} currentItem={currentItem} setCurrentItem={setCurrentItem} />
                    </Box>
                }
                {value === 2 &&
                    <Box>
                        <Expert isOpen={isOpen} setIsOpen={setIsOpen} currentItem={currentItem} setCurrentItem={setCurrentItem} />
                    </Box>
                }
            </div>
        </>
    )
}
