import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { PieChart } from '@mui/x-charts/PieChart';
import Modalcard from './Modalcard';
import Addtomeal_Modal from './Addtomeal_Modal';
import { Skeleton, Box } from '@mui/material';
import { Drumstick } from 'lucide-react';

interface BreakfastProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  isOpenAdd: boolean;
  setIsOpenAdd: (val: boolean) => void;
  currentItem: any;
  setCurrentItem: (item: any) => void;
  foodType: "veg" | "non-veg";
}

export default function Breakfast(props: BreakfastProps) {
  const meals = useSelector((state: any) => state.counter.breakfast);
  console.log("Breakfast meals from Redux:", meals);
  const displayedMeals = useMemo(() => {
    if (!meals || meals.length === 0) return [];
    return meals
      .filter((meal: any) => props.foodType === "veg" ? meal.vegetarian === true : !meal.vegetarian)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
  }, [meals, props.foodType]);

  if (!meals || meals.length === 0) {
    return (
      <div className="active-meal-container">
        {[1, 2, 3].map((n) => (
          <div className="modern-meal-card" key={n}>
            <Skeleton variant="rectangular" height={200} sx={{ borderTopLeftRadius: '16px', borderTopRightRadius: '16px', bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
            <div className="card-body-content">
              <Skeleton variant="text" sx={{ fontSize: '1.25rem', mb: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }} width="80%" />
              <div className="metrics-grid">
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Skeleton variant="circular" width={60} height={60} sx={{ mt: 1, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                </Box>
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton variant="text" width="60%" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Skeleton variant="rounded" width={80} height={24} sx={{ mt: 1, borderRadius: 8, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                </Box>
              </div>
            </div>
            <div className="card-action-footer">
              <Skeleton variant="rounded" width="45%" height={36} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
              <Skeleton variant="rounded" width="45%" height={36} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
            </div>
          </div>
        ))}
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
              <div className="card-image-wrapper">
                <img src={datab?.image} className="card-img-top" alt={datab?.title} />
              </div>

              <div className="card-body-content">
                <div className="flex justify-between gap-2">
                  <h5 className="meal-card-title flex-1">{datab?.title}</h5>
                  {datab?.vegetarian === false && (
                    <div className='bg-red-500 h-5 w-5 rounded-full flex items-center justify-center'>
                      <Drumstick size={14} />
                    </div>)}
                </div>

                <div className="metrics-grid">
                  <div className="health-score-box">
                    <span className="metric-label">Health Score</span>
                    <div className="pie-container-relative">
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