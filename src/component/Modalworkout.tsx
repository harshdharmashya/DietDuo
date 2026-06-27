import Modal from '@mui/material/Modal';
import "../CSS/Modal.css"

export default function Modalworkout(props: any) {
    const data = props.currentItem;
    const handleClose = () => props.setIsOpen(false);

    return (
        <Modal
            open={props.isOpen}
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
                                <span className="workout-meta-label">Type</span>
                                <span className="workout-meta-value">{data?.type}</span>
                            </div>
                            {data?.difficulty && (
                                <div className="workout-modal-meta-item">
                                    <span className="workout-meta-label">Difficulty</span>
                                    <span className="workout-meta-value">{data.difficulty}</span>
                                </div>
                            )}
                        </div>

                        {/* Instructions — shown only if available */}
                        {data?.instructions && (
                            <div className="workout-modal-instructions">
                                <p className="workout-modal-schedule-label">Instructions</p>
                                <p className="workout-modal-instructions-text">{data.instructions}</p>
                            </div>
                        )}

                    </div>

                    {/* Footer */}
                    <div className="workout-modal-footer">
                        <button className="workout-modal-cancel" onClick={handleClose}>Close</button>
                    </div>

                </div>
            </div>
        </Modal>
    );
}