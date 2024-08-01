import { useState } from 'react'
import { Box } from '@mui/material';
import 'react-notifications/lib/notifications.css';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import "../CSS/Modal.css"
import { useDispatch } from 'react-redux';
import { setDish } from '../Redux/Usermeal';

export default function Addtomeal_Modal(props: any) {
    const dispatch = useDispatch();
    const [day, setDay] = useState('')
    let data = props.currentItem;
    const handleCloseAdd = () => props.setIsOpenAdd(false);

    function handleAddtomeal() {
        dispatch(setDish({ data, day: day + "_" + props.mealType }))
        handleCloseAdd()
    };
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 2
    };
    function handleSelect(e: any): void {
        setDay(e.target.value)
    }

    return (
        <Modal
            open={props.isOpenAdd}
            onClose={handleCloseAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={{ ...style, width: "800px", height: 'auto', borderRadius: '10px' }}>
                <Box className='card-Box'>
                    <img className='read-image' src={data?.image} alt={data?.title} />
                    <Box sx={{ margin: 2 }}>
                        <h2 className="read-title">{data?.title}</h2>
                        <p className="read-summary">Diets :{data?.diets}</p>
                        <div style={{ display: 'flex', columnGap: '30px', alignItems: 'center' }}>
                            <div style={{ background: "#1A5319", width: '130px', borderRadius: 5, paddingLeft: 10 }}> Ready in {data?.readyInMinutes}min</div>
                            <div>
                                <select onChange={(e) => handleSelect(e)} value={day} style={{ padding: '0px 15px', background: '#1A5319', borderRadius: '5px' }}>
                                    <option value="">Day</option>
                                    <option value="Mon">Mon</option>
                                    <option value="Tus">Tus</option>
                                    <option value="Wed">Wed</option>
                                    <option value="Thur">Thur</option>
                                    <option value="Fri">Fri</option>
                                    <option value="Sat">Sat</option>
                                    <option value="Sun">Sun</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ paddingTop: '30px' }}>
                            <button onClick={() => handleAddtomeal()} style={{ background: '#1A5319', borderRadius: '5px', padding: '3px 15px' }}>Add to meal</button>
                        </div>
                    </Box>
                </Box>
            </Card>
        </Modal>
    )
}