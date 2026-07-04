import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setintermediate } from '../../Redux/workoutSlice';
import Modalworkout from '../Modalworkout';
import Addtoworkout_Modal from '../Addtoworkout_Modal';
import { MUSCLE_ICONS, MUSCLE_LIST } from './Beginner';
import { Skeleton, Box } from '@mui/material';


export default function Intermediate(props: any) {
  const dispatch = useDispatch();
  const [muscle, setMuscle] = useState('');
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const workout = async () => {
    const response = await fetch(
      `https://diet-duo-backend.vercel.app/api/exercies?difficulty=intermediate&muscle=${muscle}`
    );
    const data = await response.json();
    dispatch(setintermediate(data));
  };

  useEffect(() => {
    workout();
  }, [muscle]);

  function handleAddworkout(data: any) {
    props.setCurrentItem(data);
    setIsOpenAdd(true);
  }

  function handleModal(data: any) {
    props.setCurrentItem(data);
    props.setIsOpen(true);
  }

  const work_out: any = useSelector((state: any) => state.workout.intermediate);

  if (!work_out || work_out.length === 0) {
    return (
      <div className="workout-section" style={{ marginTop: '2rem' }}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
              <div className="cardwork" key={n}>
                  <Skeleton variant="text" width={60} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', mb: 2, borderRadius: 1 }} />
                  <Skeleton variant="text" width="80%" height={32} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', mb: 3 }} />
                  
                  <div className="cardwork-meta">
                      {[1, 2, 3].map((m) => (
                          <div className="cardwork-meta-item" key={m}>
                              <Skeleton variant="text" width={40} height={16} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', mb: 0.5 }} />
                              <Skeleton variant="text" width={80} height={20} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                          </div>
                      ))}
                  </div>
                  <div className="cardwork-actions">
                      <Skeleton variant="rounded" width="45%" height={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                      <Skeleton variant="rounded" width="45%" height={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  </div>
              </div>
          ))}
      </div>
    );
  }

  return (
    <>
      {/* Muscle filter bar */}
      <div className="muscle-filter-bar">
        <span className="muscle-filter-label">Target muscle</span>
        <div className="muscle-chips">
          {MUSCLE_LIST.map((m) => (
            <button
              key={m}
              className={`muscle-chip${muscle === m ? ' active' : ''}`}
              onClick={() => setMuscle(m)}
            >
              {MUSCLE_ICONS[m]} {m.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="workout-section">
        {work_out.map((data: any, i: number) => (
          <div className="cardwork" key={i}>
            <div className="cardwork-badge">{data.type}</div>
            <h2 className="cardwork-title">{data.name}</h2>
            <div className="cardwork-meta">
              <div className="cardwork-meta-item">
                <span className="meta-label">Equipment</span>
                <span className="meta-value">{data.equipment}</span>
              </div>
              <div className="cardwork-meta-item">
                <span className="meta-label">Muscle</span>
                <span className="meta-value">{data.muscle}</span>
              </div>
              <div className="cardwork-meta-item">
                <span className="meta-label">Difficulty</span>
                <span className="meta-value difficulty-badge-intermediate">Intermediate</span>
              </div>
            </div>
            <div className="cardwork-actions">
              <button className="btn-add-workout" onClick={() => handleAddworkout(data)}>
                + Add to plan
              </button>
              <button className="btn-read-more" onClick={() => handleModal(data)}>
                Read more
              </button>
            </div>
          </div>
        ))}

        {props.isOpen && (
          <Modalworkout
            currentItem={props.currentItem}
            isOpen={props.isOpen}
            setIsOpen={props.setIsOpen}
          />
        )}
        {isOpenAdd && (
          <Addtoworkout_Modal
            currentItem={props.currentItem}
            isOpenAdd={isOpenAdd}
            setIsOpenAdd={setIsOpenAdd}
          />
        )}
      </div>
    </>
  );
}