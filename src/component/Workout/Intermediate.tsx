import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setintermediate } from '../../Redux/workoutSlice';

export default function Intermediate(props: any) {
  const dispatch = useDispatch();
  const [muscle, setmuscle] = useState('');
  const muscle_array = [
    { name: 'abdominals' },
    { name: 'adductors' },
    { name: 'biceps' },
    { name: 'calves' },
    { name: 'chest' },
    { name: 'forearms' },
    { name: 'glutes' },
    { name: 'hamstrings' },
    { name: 'lats' },
    { name: 'lower_back' },
    { name: 'middle_back' },
    { name: 'triceps' }
    // neck,
    // quadriceps,
    // traps,
  ]
  const workout = async (difficulty: string) => {
    const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&difficulty=${difficulty}`, { headers: { 'X-Api-Key': 'vUwkaH0pCOAUL4d2BVAPiw==XLQAUW4A9eQ5zjfF' } });
    const data = await response.json();
    // console.log("api data : ",data)
    dispatch(setintermediate(data))
  };
  useEffect(() => {
    workout('intermediate');
  }, [muscle]);
  const handleOpen = () => props.setIsOpen(true);

  // for choose muscle 
  const handleChange = (e: any) => {
    setmuscle(e.target.value);
  }

  // function handleModal(data: any) {
  //   props.setCurrentItem(data)
  //   // console.log(data);
  //   handleOpen();
  // }
  const work_out: any = useSelector((state: any) => state.workout.intermediate)
  // console.log("work_out of intermediate : ",work_out)
  return (
    <>
      <div className='beginner'>
        <div className="btn-group muscle">
        <span style={{width:70}}>Muscle : </span><select className='dropdown-muscle' value={muscle}
            onChange={(e) => {
              handleChange(e)
            }}>
            {muscle_array.map((datam: any, i: number) => (
              <option className='dropdown-muscle-option' key={i} value={datam.name}>{datam.name}</option>
            ))}
          </select>
        </div>
        <div className='workout-section'>
          {work_out.map((data: any, i: number) => (
            (i == 0 || i == 1 || i == 3 || i == 4 || i == 5 || i == 6) &&
            <div className="cardwork" key={i}>
              <div style={{ height: 210 }}>
                <h2>{data.name}</h2>
                <p className="equipment"><strong>Equipment : </strong>{data.equipment}</p>
                <p className="muscle"><strong>Muscle : </strong>{data.muscle}</p>
                <p className="type"><strong>Type : </strong>{data.type}</p>
              </div>
              <div className='contain-summry-pie'>
                <button className='btn-Add-to-meal view-button'>Add to Meal</button>
                <button className='btn-Add-to-meal view-button'>Read more..</button>
                {/* <button className='btn-Add-to-meal' onClick={() => handleModal(datab)}>Read more..</button> */}
              </div>
            </div>
          ))
          }
        </div>
      </div>
    </>
  )
}
