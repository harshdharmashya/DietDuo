import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Workupdate } from '../../Redux/workoutSlice';
import Modalworkout from '../Modalworkout';

export default function Monday_Workout(props: any) {
  const dispatch = useDispatch();

  // for open modal for read more
  const [isOpenAdd, setIsOpenAdd] = useState(false);

  const [data, setdata] = useState(props.work);
  console.log(data);

  // view exercise function 
  function handlemodal(data: any): void {
    props.setCurrentItem(data)
    setIsOpenAdd(true)
  }
  function handledelete(index: number): void {
    let filterData = data.filter((_v: any, i: number) => i != index)
    dispatch(Workupdate({ filterData }))
    setdata(filterData)
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            {/* <th scope="col">Difficulty</th> */}
            <th scope="col">Exercise</th>
            <th scope="col">Muscle</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {
            data.length === 0 ? (
              <>
                <h6>Please add your meal from meal section</h6>
              </>
            ) : (
              data.map((data: any, i: number) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  {/* <td className='user-title'>{data?.difficulty}</td> */}
                  <td className='user-title'>{data.name}</td>
                  <td className='user-title'>{data?.muscle}</td>
                  <td className='user-btn'>
                    <button className='read-btn' onClick={() => handlemodal(data)}>View</button>
                    <button className='remove-btn' onClick={() => handledelete(i)}>&#128465;</button>
                  </td>
                </tr>
              )))}
          {isOpenAdd &&
            <Modalworkout currentItem={props.currentItem} setCurrentItem={props.setCurrentItem} isOpenAdd={isOpenAdd} setIsOpenAdd={setIsOpenAdd} />
          }
        </tbody>
      </table>
    </>
  )
}
