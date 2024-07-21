import React from 'react'
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import "../CSS/Modal.css"

export default function Addtomeal_Modal(props: any) {
    let data = props.currentItem;
    const handleCloseAdd = () => props.setIsOpenAdd(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
    };
    return (
        <Modal
            open={props.isOpenAdd}
            onClose={handleCloseAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={{ ...style, width: "800px", height: 'auto' }}>
                <Box className='card-Box'>
                    <img className='read-image' src={data?.image} alt={data?.title} />
                    <Box sx={{ margin: 2 }}>
                        <h2 className="read-title">{data?.title}</h2>
                        <p className="read-summary">Diets :{data?.diets}</p>
                        <div style={{ display: 'flex',columnGap:'30px',alignItems:'center'}}>
                            <div style={{ background: "#1A5319", width: '130px', borderRadius: 5, paddingLeft: 10 }}> Ready in {data?.readyInMinutes}min</div>
                            <div>
                                <select name="" id="" style={{padding:'0px 15px',background:'#1A5319',borderRadius:'5px'}}>
                                    <option value="">Mon</option>
                                    <option value="">Tus</option>
                                    <option value="">Wed</option>
                                    <option value="">Thur</option>
                                    <option value="">Fri</option>
                                    <option value="">Sat</option>
                                    <option value="">Sun</option>
                                </select>
                            </div>
                        </div>
                        <div style={{paddingTop:'30px'}}>
                        <button style={{background:'#1A5319',borderRadius:'5px',padding:'3px 15px'}}>Add to meal</button>
                        </div>
                    </Box>
                </Box>
            </Card>
        </Modal>
    )
}
