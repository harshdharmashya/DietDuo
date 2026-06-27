import { useState } from 'react'
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { setDish } from '../Redux/Usermeal';
import "../CSS/Modal.css";

const DAYS = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

export default function Addtomeal_Modal(props: any) {
  const dispatch = useDispatch();
  const [day, setDay] = useState('');
  const data = props.currentItem;

  const handleCloseAdd = () => props.setIsOpenAdd(false);

  function handleAddtomeal() {
    dispatch(setDish({ data, day: day + '_' + props.mealType }));
    handleCloseAdd();
  }

  return (
    <Modal open={props.isOpenAdd} onClose={handleCloseAdd}>
      <div className="meal-modal-overlay">
        <div className="meal-modal">

          {/* Hero image */}
          <div className="meal-modal-hero">
            <img src={data?.image} alt={data?.title} className="meal-modal-hero-img" />
            <div className="meal-modal-hero-overlay" />
            <button onClick={handleCloseAdd} className="meal-modal-close" aria-label="Close">✕</button>
            <div className="meal-modal-hero-title-wrap">
              <h2 className="meal-modal-hero-title">{data?.title}</h2>
            </div>
          </div>

          {/* Body */}
          <div className="meal-modal-body">

            {/* Diet tags */}
            {data?.diets && (
              <div className="meal-modal-tags">
                {(Array.isArray(data.diets) ? data.diets : [data.diets]).map((d: string) => (
                  <span key={d} className="meal-modal-tag">{d}</span>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="meal-modal-stats">
              <div className="meal-stat-card">
                <div className="meal-stat-icon">⏱</div>
                <div>
                  <p className="meal-stat-label">Ready in</p>
                  <p className="meal-stat-value">{data?.readyInMinutes} min</p>
                </div>
              </div>
              {data?.healthScore !== undefined && (
                <div className="meal-stat-card">
                  <div className="meal-stat-icon">❤️</div>
                  <div>
                    <p className="meal-stat-label">Health score</p>
                    <p className="meal-stat-value">{data.healthScore} / 100</p>
                  </div>
                </div>
              )}
            </div>

            {/* Day picker */}
            <div className="meal-modal-schedule">
              <p className="meal-modal-schedule-label">Choose day</p>
              <div className="meal-modal-days">
                {DAYS.map(d => (
                  <button
                    key={d}
                    onClick={() => setDay(d)}
                    className={`meal-day-pill${day === d ? ' selected' : ''}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="meal-modal-footer">
            <button onClick={handleCloseAdd} className="meal-modal-cancel">Cancel</button>
            <button
              onClick={handleAddtomeal}
              disabled={!day}
              className={`meal-modal-add${!day ? ' disabled' : ''}`}
            >
              + Add to meal plan
            </button>
          </div>

        </div>
      </div>
    </Modal>
  );
}