import React from 'react'
import img1 from "../Images/modalworkout-bg.png"
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import "../CSS/Modal.css"
import "../CSS/Modalworkout.css"

export default function Addtoworkout_Modal(props:any) {
    let data = props.currentItem;
    const handleClose = () => props.setIsOpen(false);

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
            open={props.isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card className='modal-container' sx={{ ...style,borderRadius:'20px',border:'none',boxShadow: '10px 10px 15px grey'}}>
                <Box className='card-Box'>
                <div className='modal-inner-cont' style={{ height: 210, color: 'black' }}>
                    <h2>{data.name}</h2>
                    <p className="equipment"><strong>Equipment : </strong>{data?.equipment}</p>
                    <p className="muscle"><strong>Muscle : </strong>{data?.muscle}</p>
                    <p className="type"><strong>Type : </strong>{data?.type}</p>
                </div> 
                <select name="" id="">
                    <option value="">Day</option>
                    <option value="">Mon</option>
                    <option value="">Tues</option>
                    <option value="">Thur</option>
                    <option value="">fri</option>
                    <option value="">Sat</option>
                    <option value="">Sun</option>
                </select>
                </Box>
            </Card>
        </Modal>
  )
}

