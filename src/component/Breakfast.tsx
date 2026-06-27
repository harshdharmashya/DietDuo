import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { PieChart } from '@mui/x-charts/PieChart';
import Modalcard from './Modalcard';
import Addtomeal_Modal from './Addtomeal_Modal';

interface BreakfastProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  isOpenAdd: boolean;
  setIsOpenAdd: (val: boolean) => void;
  currentItem: any;
  setCurrentItem: (item: any) => void;
}

export default function Breakfast(props: BreakfastProps) {
  const meals = useSelector((state: any) => state.counter.breakfast);

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
                {/* <div className="card-badge-overlay">{datab.healthScore}</div> */}
              </div>

              {/* Main Body */}
              <div className="card-body-content">
                <h5 className="meal-card-title">{datab?.title}</h5>

                <div className="metrics-grid">
                  {/* Health Score Ring */}
                  <div className="health-score-box">
                    <span className="metric-label">Health Score</span>
                    <div className="pie-container-relative">
                      {/* CSS-Absolute Label prevents cutting/clipping text */}
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
                            paddingAngle: 0,
                            cx: 26, // Manually center within chart frame box
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

                  {/* Diets Section */}
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

              {/* Redesigned Button Footer */}
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
        <Addtomeal_Modal mealType={'Breakfast'} currentItem={props.currentItem} isOpenAdd={props.isOpenAdd} setIsOpenAdd={props.setIsOpenAdd} />
      )}
    </>
  );
}