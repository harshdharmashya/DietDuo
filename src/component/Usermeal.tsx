import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Monday from './Day/Monday';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import "../CSS/Meal.css"
import "../CSS/workout.css"
import "../CSS/Usermeal.css"
export default function Usermeal(props: any) {

  // for tab
  const [value, setValue] = useState(0);

  const Mon_Break = useSelector((state: any) => state.meal.Mon_Breakfast);
  const Tus_Break = useSelector((state: any) => state.meal.Tus_Breakfast);
  const Wed_Break = useSelector((state: any) => state.meal.Wed_Breakfast);
  const Thur_Break = useSelector((state: any) => state.meal.Thur_Breakfast);
  const Fri_Break = useSelector((state: any) => state.meal.Fri_Breakfast);
  const Sat_Break = useSelector((state: any) => state.meal.Sat_Breakfast);
  const Sun_Break = useSelector((state: any) => state.meal.Sun_Breakfast);
  const Mon_Lunch = useSelector((state: any) => state.meal.Mon_Lunch);
  const Tus_Lunch = useSelector((state: any) => state.meal.Tus_Lunch);
  const Wed_Lunch = useSelector((state: any) => state.meal.Wed_Lunch);
  const Thur_Lunch = useSelector((state: any) => state.meal.Thur_Lunch);
  const Fri_Lunch = useSelector((state: any) => state.meal.Fri_Lunch);
  const Sat_Lunch = useSelector((state: any) => state.meal.Sat_Lunch);
  const Sun_Lunch = useSelector((state: any) => state.meal.Sun_Lunch);
  const Mon_Dinner = useSelector((state: any) => state.meal.Mon_Dinner);
  const Tus_Dinner = useSelector((state: any) => state.meal.Tus_Dinner);
  const Wed_Dinner = useSelector((state: any) => state.meal.Wed_Dinner);
  const Thur_Dinner = useSelector((state: any) => state.meal.Thur_Dinner);
  const Fri_Dinner = useSelector((state: any) => state.meal.Fri_Dinner);
  const Sat_Dinner = useSelector((state: any) => state.meal.Sat_Dinner);
  const Sun_Dinner = useSelector((state: any) => state.meal.Sun_Dinner);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

  return (
    <>
      <Navbar user={props.user} setUser={props.setUser} handleLogout={props.handleLogout} />
      <div className='usermeal'>
        <div className='headline-work headline-extra'>𝓨𝓸𝓾𝓻 𝓜𝓮𝓪𝓵...</div>
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
          <h2>𝓑𝓻𝓮𝓪𝓴𝓯𝓪𝓼𝓽</h2>
          {value === 0 &&
            <Box>
              <Monday meal={Mon_Break} />
            </Box>
          }
          {value === 1 &&
            <Box>
              <Monday meal={Tus_Break} />
            </Box>
          }
          {value === 2 &&
            <Box>
              <Monday meal={Wed_Break} />
            </Box>
          }
          {value === 3 &&
            <Box>
              <Monday meal={Thur_Break} />
            </Box>
          }
          {value === 4 &&
            <Box>
              <Monday meal={Fri_Break} />
            </Box>
          }
          {value === 5 &&
            <Box>
              <Monday meal={Sat_Break} />
            </Box>
          }
          {value === 6 &&
            <Box>
              <Monday meal={Sun_Break} />
            </Box>
          }
          <h2>𝓛𝓾𝓷𝓬𝓱</h2>
          {value === 0 &&
            <Box>
              <Monday meal={Mon_Lunch} />
            </Box>
          }
          {value === 1 &&
            <Box>
              <Monday meal={Tus_Lunch} />
            </Box>
          }
          {value === 2 &&
            <Box>
              <Monday meal={Wed_Lunch} />
            </Box>
          }
          {value === 3 &&
            <Box>
              <Monday meal={Thur_Lunch} />
            </Box>
          }
          {value === 4 &&
            <Box>
              <Monday meal={Fri_Lunch} />
            </Box>
          }
          {value === 5 &&
            <Box>
              <Monday meal={Sat_Lunch} />
            </Box>
          }
          {value === 6 &&
            <Box>
              <Monday meal={Sun_Lunch} />
            </Box>
          }
          <h2>𝓓𝓲𝓷𝓷𝓮𝓻</h2>
          {value === 0 &&
            <Box>
              <Monday meal={Mon_Dinner} />
            </Box>
          }
          {value === 1 &&
            <Box>
              <Monday meal={Tus_Dinner} />
            </Box>
          }
          {value === 2 &&
            <Box>
              <Monday meal={Wed_Dinner} />
            </Box>
          }
          {value === 3 &&
            <Box>
              <Monday meal={Thur_Dinner} />
            </Box>
          }
          {value === 4 &&
            <Box>
              <Monday meal={Fri_Dinner} />
            </Box>
          }
          {value === 5 &&
            <Box>
              <Monday meal={Sat_Dinner} />
            </Box>
          }
          {value === 6 &&
            <Box>
              <Monday meal={Sun_Dinner} />
            </Box>
          }
        </div>
        {props.setshow ?
          <button className='GoBack-btn' onClick={() => props.setshow(true)}>Go Back</button>
          :
          ''
        }
      </div>
    </>
  )
}
