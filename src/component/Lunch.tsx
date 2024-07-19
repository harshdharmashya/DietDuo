import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { setLunch } from '../Redux/frontSlice';
import { Link } from 'react-router-dom';
import Modalcard from './Modalcard';

const size = {
  width: 150,
  height: 70,
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
export default function Lunch(props: any) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMeals = async (mealType: string) => {
      const response = await fetch(`https://api.spoonacular.com/recipes/random?number=3&tags=${mealType}&apiKey=33f2cc0aa5bd4b88ac7f4b6b73558dfd`);
      const data = await response.json();
      dispatch(setLunch(data))
    };
    fetchMeals('lunch');
  }, []);
  const handleOpen = () => props.setIsOpen(true);

  function handleModal(data: any) {
    props.setCurrentItem(data)
    console.log(data);
    handleOpen();
  }
  const meals = useSelector((state: any) => state.counter.lunch)
  // console.log(meals);
  if (meals.length === 0) {
    return <>
      <div className='loader-height'>
        <div className="spinner-border text-light load" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>; // Display loader if data is empty
  }

  return (
    <>
      <div className='active-meal'>
        {meals?.recipes?.map((datab: any, i: number) => (
          <div className="card card-rec mb-3 m-2" key={i}>
            <img style={{ height: 270, color: 'black' }} src={datab?.image} className="card-img-top" alt={datab?.title} />
            <div className="card-body">
              <h5 className="card-title text-dark">{datab?.title}</h5>
              <div className='contain-summry-pie'>
                <div className='pie-chart-health'>
                  <p style={{ color: "black" }}>Health Score :</p>
                  <PieChart series={[{
                    data: [
                      { value: datab.healthScore, label: 'A' },
                      { value: 100, label: 'B' }
                    ], innerRadius: 15
                  }]} {...size}>
                    <PieCenterLabel>{datab.healthScore}</PieCenterLabel>
                  </PieChart>
                </div>
                <div className='diets-array'>
                  <p className='diets-array-p'>Diets : {datab.diets}</p>

                </div>
              </div>
            </div>
            <div className='contain-summry-pie'>
              <button className='btn-Add-to-meal'>Add to Meal</button>
              <button className='btn-Add-to-meal' onClick={() => handleModal(datab)}>Read more..</button>
            </div>
          </div>))
        }
        {props.isOpen &&
          <Modalcard currentItem={props.currentItem} isOpen={props.isOpen} setIsOpen={props.setIsOpen} />
        }
      </div>
    </>
  )
}
