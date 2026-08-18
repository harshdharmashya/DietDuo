import { useState } from 'react'
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import { setDish } from '../Redux/Usermeal';
import "../CSS/Modal.css";
import { Drumstick, HeartPlus, Timer } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

export default function Addtomeal_Modal(props: any) {
  const dispatch = useDispatch();
  const [day, setDay] = useState('');
  const data = props.currentItem;

  const handleCloseAdd = () => props.setIsOpenAdd(false);

  async function handleAddtomeal() {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login to add to meal plan!");
      handleCloseAdd();
      return;
    }

    try {
      const payload = {
        day: day,
        mealType: props.mealType,
        recipeId: data.id || data._id
      };

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/schedule/meal`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        dispatch(setDish({ data, day: day + '_' + props.mealType }));
        toast.success("Meal added successfully!");
        handleCloseAdd();
      } else {
        toast.error(response.data.message || "Failed to add meal");
      }
    } catch (error) {
      console.error('Error adding meal:', error);
      toast.error("Error adding meal to schedule");
    }
  }

  return (
    <Modal open={props.isOpenAdd} onClose={handleCloseAdd}>
      <div className="meal-modal-overlay">
        <div className="meal-modal">

          <div className="meal-modal-hero">
            <img src={data?.image} alt={data?.title} className="meal-modal-hero-img" />
            <div className="meal-modal-hero-overlay" />
            <button onClick={handleCloseAdd} className="meal-modal-close" aria-label="Close">✕</button>
            <div className="meal-modal-hero-title-wrap">
              <div className="flex justify-between gap-2">
                <h5 className="meal-card-title flex-1 text-white!">{data?.title}</h5>
                {data?.vegetarian === false && (
                  <div className='bg-red-500 h-5 w-5 rounded-full flex items-center justify-center'>
                    <Drumstick size={14} />
                  </div>)}
              </div>
            </div>
          </div>

          <div className="meal-modal-body">

            {data?.diets && (
              <div className="meal-modal-tags">
                {(Array.isArray(data.diets) ? data.diets : [data.diets]).map((d: string) => (
                  <span key={d} className="meal-modal-tag">{d}</span>
                ))}
              </div>
            )}

            <div className="meal-modal-stats">
              <div className="meal-stat-card">
                <div className="meal-stat-icon"><Timer /></div>
                <div>
                  <p className="meal-stat-label">Ready in</p>
                  <p className="meal-stat-value">{data?.readyInMinutes} min</p>
                </div>
              </div>
              {data?.healthScore !== undefined && (
                <div className="meal-stat-card">
                  <div className="meal-stat-icon"><HeartPlus /></div>
                  <div>
                    <p className="meal-stat-label">Health score</p>
                    <p className="meal-stat-value">{data.healthScore} / 100</p>
                  </div>
                </div>
              )}
            </div>

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