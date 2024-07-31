import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "../../CSS/Meal.css"
import "../../CSS/workout.css"
import "../../CSS/Usermeal.css"
import { useSelector } from 'react-redux';
import Monday_Workout from './Monday_Workout';
import Navbar from '../Navbar';

export default function User_Workout(props:any) {
    // for data transfer to the modal
  const [currentItem, setCurrentItem] = useState({});
    // for tab
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    const Mon = useSelector((state: any) => state.workout.Mon);
    const Tus = useSelector((state: any) => state.workout.Tus);
    const Wed = useSelector((state: any) => state.workout.Wed);
    const Thur = useSelector((state: any) => state.workout.Thur);
    const Fri= useSelector((state: any) => state.workout.Fri);
    const Sat = useSelector((state: any) => state.workout.Sat);
    const Sun = useSelector((state: any) => state.workout.Sun);
    
    return (
        <>
        <Navbar user={props.user} setUser={props.setUser} handleLogout={props.handleLogout}/>
            <div className='usermeal'>
                <div className='headline-work headline-extra'>𝓨𝓸𝓾𝓻 𝓦𝓸𝓻𝓴 𝓸𝓾𝓽...</div>
                <div>
                    <div className='day-tab'>
                        <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: '#1A5319' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons
                                allowScrollButtonsMobile
                                aria-label="scrollable force tabs example"
                            >
                                <Tab label="Mon" sx={{ color: "white" }} />
                                <Tab label="Tues" sx={{ color: "white" }} />
                                <Tab label="Wed" sx={{ color: "white" }} />
                                <Tab label="Thur" sx={{ color: "white" }} />
                                <Tab label="Fri" sx={{ color: "white" }} />
                                <Tab label="Sat" sx={{ color: "white" }} />
                                <Tab label="Sun" sx={{ color: "white" }} />
                            </Tabs>
                        </Box>

                    </div>
                    {value === 0 &&
                        <Box>
                            <Monday_Workout work={Mon} currentItem={currentItem} setCurrentItem={setCurrentItem}/>
                        </Box>
                    }
                    {value === 1 &&
                        <Box>
                            <Monday_Workout work={Tus} currentItem={currentItem} setCurrentItem={setCurrentItem}/>
                        </Box>
                    }
                    {value === 2 &&
                        <Box>
                            <Monday_Workout work={Wed} currentItem={currentItem} setCurrentItem={setCurrentItem}/>
                        </Box>
                    }
                    {value === 3 &&
                        <Box>
                            <Monday_Workout work={Thur} currentItem={currentItem} setCurrentItem={setCurrentItem}/>
                        </Box>
                    }
                    {value === 4 &&
                        <Box>
                            <Monday_Workout work={Fri} currentItem={currentItem} setCurrentItem={setCurrentItem}/>
                        </Box>
                    }
                    {value === 5 &&
                        <Box>
                            <Monday_Workout work={Sat} currentItem={currentItem} setCurrentItem={setCurrentItem}/>
                        </Box>
                    }
                    {value === 6 &&
                        <Box>
                            <Monday_Workout work={Sun} currentItem={currentItem} setCurrentItem={setCurrentItem}/>
                        </Box>
                    }
                </div>
                {/* <button className='GoBack-btn' onClick={() => props.setshow(true)}>Go Back</button> */}
            </div>
        </>
    )
}
