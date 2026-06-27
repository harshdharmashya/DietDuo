import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart } from '@mui/x-charts/PieChart';
import { setLunch } from '../Redux/frontSlice';
import Modalcard from './Modalcard';
import Addtomeal_Modal from './Addtomeal_Modal';
import "../CSS/Meal.css"

interface LunchProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  isOpenAdd: boolean;
  setIsOpenAdd: (val: boolean) => void;
  currentItem: any;
  setCurrentItem: (item: any) => void;
}

export default function Lunch(props: LunchProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMeals = async (mealType: string) => {
      try {
        const response = await fetch(`https://diet-duo-backend.vercel.app/api/recipes?mealType=${mealType}`);
        const data = await response.json();
        dispatch(setLunch(data));
      } catch (error) {
        console.error("Failed fetching lunch items:", error);
      }
    };
    fetchMeals('lunch');
  }, [dispatch]);

  const meals = useSelector((state: any) => state.counter.lunch);

  // Prevents card items from wildly jumping around and flashing whenever a modal opens
  const displayedMeals = useMemo(() => {
    if (!meals || meals.length === 0) return [];
    return [...meals]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, [meals]);

  if (!meals || meals.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center loader-height" style={{ minHeight: '200px' }}>
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="active-meal-container">
        {displayedMeals.map((datab: any, i: number) => {
          const score = datab?.healthScore || 0;

          return (
            <div className="modern-meal-card" key={datab.id || i}>
              {/* Image Banner Section */}
              <div className="card-image-wrapper">
                <img src={datab?.image} className="card-img-top" alt={datab?.title} />
                {/* <div className="card-badge-overlay">Lunch</div> */}
              </div>

              {/* Main Info Wrapper */}
              <div className="card-body-content">
                <h5 className="meal-card-title">{datab?.title}</h5>

                <div className="metrics-grid">
                  {/* Clean Non-Clipping Health Score Circular Progress */}
                  <div className="health-score-box">
                    <span className="metric-label">Health Score</span>
                    <div className="pie-container-relative">
                      {/* Fully centered layer text that will never cut out on small canvases */}
                      <span className="pie-center-percentage">{score}%</span>
                      <PieChart
                        series={[
                          {
                            data: [
                              { value: score, color: '#4caf50' },
                              { value: Math.max(0, 100 - score), color: '#e2e8f0' }
                            ],
                            innerRadius: 18,
                            outerRadius: 25,
                            cx: 26,
                            cy: 26,
                          },
                        ]}
                        width={60}
                        height={60}
                        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                        slotProps={{ legend: { hidden: true } }}
                      />
                    </div>
                  </div>

                  {/* Diet Badge Pills */}
                  <div className="diets-box">
                    <span className="metric-label">Diet Tags</span>
                    <div className="diet-pill-container">
                      {Array.isArray(datab?.diets) && datab.diets.length > 0 ? (
                        datab.diets.slice(0, 2).map((diet: string, idx: number) => (
                          <span key={idx} className="diet-pill">
                            {diet}
                          </span>
                        ))
                      ) : (
                        <span className="diet-pill standard">Standard</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Distinct Button Footer Layout */}
              <div className="card-action-footer">
                <button
                  className="btn-action btn-read"
                  onClick={() => { props.setCurrentItem(datab); props.setIsOpen(true); }}
                >
                  Details
                </button>
                <button
                  className="btn-action btn-add"
                  onClick={() => { props.setCurrentItem(datab); props.setIsOpenAdd(true); }}
                >
                  + Add to Meal
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {props.isOpen && (
        <Modalcard currentItem={props.currentItem} isOpen={props.isOpen} setIsOpen={props.setIsOpen} />
      )}
      {props.isOpenAdd && (
        <Addtomeal_Modal mealType={'Lunch'} currentItem={props.currentItem} isOpenAdd={props.isOpenAdd} setIsOpenAdd={props.setIsOpenAdd} />
      )}
    </>
  );
}