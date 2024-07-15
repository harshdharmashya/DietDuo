import React, { useState } from 'react'
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import "../CSS/Modal.css"
export default function Modalcard(props: any) {
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
            <Card sx={{ ...style, width: "800px", height: 'auto' }}>
                <Box className='card-Box'>
                    <img className='read-image' src={data?.image} alt={data?.title} />
                    <Box sx={{ margin: 2 }}>
                        <h2 className="read-title">{data?.title}</h2>
                        <p className="read-summary">Diets :{data?.diets}</p>
                        <Box className="read-check">
                            <Box style={{ color: 'black' }}>Diary Free :{data?.diaryFree ? <DoneIcon className='DoneIcon' /> : <CloseIcon className='CloseIcon' />}</Box>
                            <Box style={{ color: 'black', marginLeft: '9px' }}>Gluten Free :{data?.glutenFree ? <DoneIcon  className='DoneIcon' /> : <CloseIcon className='CloseIcon'/>}</Box>
                        </Box>
                        <Box className="read-check">
                            <p style={{ color: 'black' }}>Vegan :{data?.vegan ? <DoneIcon className='DoneIcon'/> : <CloseIcon className='CloseIcon' />}</p>
                            <p style={{ color: 'black', marginLeft: '9px' }}>Vegetarian :{data?.vegetarian ? <DoneIcon  className='DoneIcon'/> : <CloseIcon className='CloseIcon' />}</p>
                        </Box>
                    <div style={{background:"#1A5319",width:'130px',borderRadius:5,paddingLeft:10}}> Ready in {data?.readyInMinutes}min</div> 
                    </Box>
                </Box>
            </Card>
        </Modal>
    )
}
