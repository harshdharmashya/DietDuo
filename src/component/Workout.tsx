import React,{useState} from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import "../CSS/Meal.css"
import "../CSS/workout.css"
import Beginner from "./Workout/Beginner"
import Intermediate from './Workout/Intermediate'
import Expert from './Workout/Expert'
export default function Workout() {
    const [value, setValue] = useState(0);
    const [currentItem, setCurrentItem] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }
        return (
            <>
                <div className='work'>
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
