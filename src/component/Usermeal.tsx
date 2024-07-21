import { colors } from '@mui/material'
import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "../CSS/Meal.css"
import "../CSS/workout.css"
import "../CSS/Usermeal.css"
import Monday from './Day/Monday';
import Tuesday from './Day/Tuesday';
import Wednesday from './Day/Wednesday';
import Sunday from './Day/Sunday';
import Saturday from './Day/Saturday';
import Thursday from './Day/Thursday';
import Friday from './Day/Friday';
export default function Usermeal(props: any) {

  // for tab
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }

 

  return (
    <>
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
              <Tab label="Mon"  sx={{ color: "white" }} />
              <Tab label="Tues"  sx={{ color: "white" }} />
              <Tab label="Wed"  sx={{ color: "white" }} />
              <Tab label="Thur"  sx={{ color: "white" }} />
              <Tab label="Fri"  sx={{ color: "white" }} />
              <Tab label="Sat"  sx={{ color: "white" }} />
              <Tab label="Sun"  sx={{ color: "white" }} />
            </Tabs>
          </Box>
          
          </div>
          <h2>𝓛𝓾𝓷𝓬𝓱</h2>
          {value === 0 &&
            <Box>
              <Monday/>
            </Box>
          }
          {value === 1 &&
            <Box>
              <Tuesday/>
            </Box>
          }
          {value === 2 &&
            <Box>
              <Wednesday/>
            </Box>
          }
          {value === 3 &&
            <Box>
              <Thursday/>
            </Box>
          }
          {value === 4 &&
            <Box>
              <Friday/>
            </Box>
          }
          {value === 5 &&
            <Box>
              <Saturday/>
            </Box>
          }
          {value === 6 &&
            <Box>
              <Sunday/>
            </Box>
          }
        </div>
      </div>
    </>
  )
}
