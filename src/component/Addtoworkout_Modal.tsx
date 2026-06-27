import { useState } from 'react'
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { setWork } from '../Redux/workoutSlice';
import "../CSS/Modal.css"

const DAYS = ['Mon', 'Tus', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

export default function Addtoworkout_Modal(props: any) {
    const dispatch = useDispatch();
    const data = props.currentItem;
    const [day, setDay] = useState('');

    const handleClose = () => props.setIsOpenAdd(false);

    function handleAddtoworkout() {
        dispatch(setWork({ data, day }));
        handleClose();
    }

    return (
        <Modal
            open={props.isOpenAdd}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="workout-modal-overlay">
                <div className="workout-modal">

                    {/* Header */}
                    <div className="workout-modal-header">
                        <div className="workout-modal-header-content">
                            <div className="workout-modal-type-badge">{data?.type}</div>
                            <h2 className="workout-modal-title">{data?.name}</h2>
                        </div>
                        <button className="workout-modal-close" onClick={handleClose} aria-label="Close">✕</button>
                    </div>

                    {/* Body */}
                    <div className="workout-modal-body">

                        {/* Meta */}
                        <div className="workout-modal-meta">
                            <div className="workout-modal-meta-item">
                                <span className="workout-meta-label">Equipment</span>
                                <span className="workout-meta-value">{data?.equipment}</span>
                            </div>
                            <div className="workout-modal-meta-item">
                                <span className="workout-meta-label">Muscle</span>
                                <span className="workout-meta-value">{data?.muscle}</span>
                            </div>
                            <div className="workout-modal-meta-item">
                                <span className="workout-meta-label">Difficulty</span>
                                <span className="workout-meta-value">{data?.difficulty ?? '—'}</span>
                            </div>
                        </div>

                        {/* Day picker */}
                        <div className="workout-modal-schedule">
                            <p className="workout-modal-schedule-label">Choose day</p>
                            <div className="workout-modal-days">
                                {DAYS.map((d) => (
                                    <button
                                        key={d}
                                        className={`workout-day-pill${day === d ? ' selected' : ''}`}
                                        onClick={() => setDay(d)}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Footer */}
                    <div className="workout-modal-footer">
                        <button className="workout-modal-cancel" onClick={handleClose}>Cancel</button>
                        <button
                            className={`workout-modal-add${!day ? ' disabled' : ''}`}
                            disabled={!day}
                            onClick={handleAddtoworkout}
                        >
                            + Add to workout
                        </button>
                    </div>

                </div>
            </div>
        </Modal>
    );
}