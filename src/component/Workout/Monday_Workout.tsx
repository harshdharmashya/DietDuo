import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { motion } from "framer-motion";
import { setDayWorkouts } from '../../Redux/workoutSlice';
import Modalworkout from '../Modalworkout';

export default function Monday_Workout(props: any) {
  const dispatch = useDispatch();

  // for open modal for read more
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const [data, setdata] = useState(props.work);
  useEffect(() => {
    setdata(props.work);
  }, [props.work]);

  // view exercise function 
  function handlemodal(data: any): void {
    props.setCurrentItem(data)
    setIsOpenAdd(true)
  }
  function handledelete(index: number): void {
    let filterData = data.filter((_v: any, i: number) => i != index)
    dispatch(setDayWorkouts({ day: props.dayKey, items: filterData }))
  }

  return (
    <>
      <div className="meal-cards-grid">
        {data.length === 0 ? (
          <div className="meal-empty meal-empty--span">
            <div className="meal-empty-icon" aria-hidden>
              💪
            </div>
            <h3 className="display-font">Nothing here yet</h3>
            <p>
              Add exercises from the home page workout section for this day. They will show up here as cards you
              can view or remove.
            </p>
          </div>
        ) : (
          data.map((item: any, i: number) => (
            <motion.article
              key={`${item?.name ?? "workout"}-${i}`}
              className="meal-card"
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: Math.min(i * 0.05, 0.35), ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="meal-card-body" style={{ minHeight: '160px', display: 'flex', flexDirection: 'column' }}>
                <h3 className="meal-card-title">{item?.name}</h3>
                <p className="meal-card-diets">Muscle: {item?.muscle || "—"}</p>
                <div style={{ flexGrow: 1 }}></div>
                <div className="meal-card-actions">
                  <button type="button" className="meal-card-btn meal-card-btn--view" onClick={() => handlemodal(item)}>
                    View details
                  </button>
                  <button
                    type="button"
                    className="meal-card-btn meal-card-btn--remove"
                    title="Remove from list"
                    aria-label="Remove workout"
                    onClick={() => handledelete(i)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>

      {isOpenAdd &&
        <Modalworkout currentItem={props.currentItem} setCurrentItem={props.setCurrentItem} isOpenAdd={isOpenAdd} setIsOpenAdd={setIsOpenAdd} />
      }
    </>
  )
}
