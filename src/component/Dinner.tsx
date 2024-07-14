import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { setDinner } from '../Redux/frontSlice';

const size = {
  width: 150,
  height: 75,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}
export default function Dinner() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMeals = async (mealType: string) => {
      const response = await fetch(`https://api.spoonacular.com/recipes/random?number=3&tags=${mealType}&apiKey=33f2cc0aa5bd4b88ac7f4b6b73558dfd`);
      const data = await response.json();
      dispatch(setDinner(data))
    };
    fetchMeals('dinner');
  }, []);
  const meals = useSelector((state: any) => state.counter.dinner)
  // console.log(meals);
  return (
    <>
    <div className='active-meal'>
      {meals?.recipes?.map((datab: any, i: number) => (
        <div className="card mb-3 m-2" key={i}>
          <img src={datab?.image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title text-dark">{datab?.title}</h5>
            {/* <p className="card-text text-dark">{datab?.summary}</p> */}
            <div className='contain-summry-pie' style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 0, width: 100 }}>
                <p style={{ color: "black" }}>Health Score :</p>
                <PieChart series={[{
                  data:[
                  { value: datab.healthScore, label: 'A' },
                  { value: 100, label: 'B' }
                  ], innerRadius: 15
                }]} {...size}>
                  <PieCenterLabel>{datab.healthScore}</PieCenterLabel>
                </PieChart>
              </div>
              <div style={{ position: "absolute", right: 0, width: 200 }} className='diets-array'>
                <p style={{ color: "black",height:90 }}>Diets : <br />{datab.diets}{console.log(datab.diets)}</p>
                
              </div>
            </div>
          </div>
          <div className='contain-summry-pie'>
          <button className='btn-Add-to-meal'>Add to Meal</button>
          <button className='btn-Add-to-meal'>Read more..</button>
          </div>
        </div>))
      }
    </div>
  </>
  )
}
