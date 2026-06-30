import { Card, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import DoneIcon from '@mui/icons-material/Done';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import "../CSS/mealDetailsModal.css";

interface ModalcardProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  currentItem: any;
}

export default function Modalcard(props: ModalcardProps) {
  let data = props.currentItem;
  const handleClose = () => props.setIsOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    border: 'none',
    p: 0,
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={handleClose}
      aria-labelledby="modal-recipe-title"
    >
      <Card 
        sx={{ ...style, width: { xs: '92%', md: '800px' }, borderRadius: '16px', overflow: 'hidden' }}
      >
        {/* Floating Close Button */}
        <IconButton 
          onClick={handleClose} 
          className="modal-close-trigger"
        >
          <CloseIcon />
        </IconButton>

        <div className="modal-split-layout">
          {/* Left Media Column */}
          <div className="modal-media-pane">
            <img className="modal-hero-image" src={data?.image} alt={data?.title} />
          </div>

          {/* Right Data Column */}
          <div className="modal-content-pane">
            <div>
              <h2 id="modal-recipe-title" className="modal-recipe-title">
                {data?.title}
              </h2>

              <div className="recipe-time-badge">
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                <span>Ready in {data?.readyInMinutes} mins</span>
              </div>
              
              <hr className="modal-divider" />

              {/* Diet Tags */}
              <div className="modal-section-block">
                <h4 className="modal-section-heading">Diets / Types</h4>
                <div className="modal-diet-tags-flex">
                  {Array.isArray(data?.diets) && data.diets.length > 0 ? (
                    data.diets.map((diet: string, idx: number) => (
                      <span key={idx} className="modal-diet-tag">
                        {diet}
                      </span>
                    ))
                  ) : (
                    <span className="modal-diet-tag">Standard Recipe</span>
                  )}
                </div>
              </div>

              {/* Preferences Checklist Grid */}
              <div className="modal-section-block">
                <h4 className="modal-section-heading">Preferences Checklist</h4>
                <div className="diet-status-grid">
                  
                  <div className={`status-pill ${data?.diaryFree ? 'is-allowed' : 'is-restricted'}`}>
                    {data?.diaryFree ? <DoneIcon className="status-ico" /> : <CloseIcon className="status-ico" />}
                    <span >Dairy Free</span>
                  </div>

                  <div className={`status-pill ${data?.glutenFree ? 'is-allowed' : 'is-restricted'}`}>
                    {data?.glutenFree ? <DoneIcon className="status-ico" /> : <CloseIcon className="status-ico" />}
                    <span>Gluten Free</span>
                  </div>

                  <div className={`status-pill ${data?.vegan ? 'is-allowed' : 'is-restricted'}`}>
                    {data?.vegan ? <DoneIcon className="status-ico" /> : <CloseIcon className="status-ico" />}
                    <span>Vegan</span>
                  </div>

                  <div className={`status-pill ${data?.vegetarian ? 'is-allowed' : 'is-restricted'}`}>
                    {data?.vegetarian ? <DoneIcon className="status-ico" /> : <CloseIcon className="status-ico" />}
                    <span>Vegetarian</span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Modal>
  );
}