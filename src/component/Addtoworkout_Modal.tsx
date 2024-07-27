import React, { useState } from 'react'
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import "../CSS/Modal.css"
import "../CSS/Modalworkout.css"
import { useDispatch, useSelector } from 'react-redux';
import { setWork } from '../Redux/workoutSlice';

export default function Addtoworkout_Modal(props: any) {
    const dispatch = useDispatch();
    let data = props.currentItem;

    // to get the day on which work out set on schdule
    const [day, setDay] = useState('')

    // for close modal
    const handleClose = () => props.setIsOpenAdd(false);
    
    function handleAddtoworkout(data:any) {
        dispatch(setWork({ data, day: day + "_" + props.worktype}))
        handleClose()
    };
    const work = useSelector((state:any)=>state.workout.setWork)
    console.log(work)
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };
    return (
        <Modal
            open={props.isOpenAdd}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card className='modal-container' sx={{ ...style, borderRadius: '20px', border: 'none', boxShadow: '10px 10px 15px grey' }}>
                <Box className='card-Box'>
                    <div className='modal-inner-cont' style={{ height: 210, color: 'black' }}>
                        <h2>{data.name}</h2>
                        <p className="equipment"><strong>Equipment : </strong>{data?.equipment}</p>
                        <p className="muscle"><strong>Muscle : </strong>{data?.muscle}</p>
                        <p className="type"><strong>Type : </strong>{data?.type}</p>
                    </div>

                </Box>
                <div className='workModal-Add-select'>
                    <button className='Addworkout-btn' onClick={()=>handleAddtoworkout(data)}>Add to Workout</button>
                    <div>
                        <select className='select-day' onChange={(e) => setDay(e.target.value)} value={day}>
                            <option value="">Day</option>
                            <option value="Mon">Mon</option>
                            <option value="Tus">Tues</option>
                            <option value="Thur">Thur</option>
                            <option value="Fri">fri</option>
                            <option value="Sat">Sat</option>
                            <option value="Sun">Sun</option>
                        </select>
                    </div>
                </div>
            </Card>
        </Modal>
    )
}