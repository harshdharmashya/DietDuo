import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modalcard from '../Modalcard';
import { update } from '../../Redux/Usermeal';
export default function Monday(props: any) {
  const dispatch = useDispatch();
  
  // for open modal for read more
  const [isOpen, setIsOpen] = useState(false);

  const [data, setdata] = useState(props.meal)
  // if (Mon.length === 0) {
  //     return <>
  //       <div className='loader-height'>
  //         <div className="spinner-border text-light load" role="status">
  //           <span className="visually-hidden">Loading...</span>
  //         </div>
  //       </div>
  //     </>; // Display loader if data is empty
  //   }
  function handlemodal(data: any): void {
    props.setCurrentItem(data)
    setIsOpen(true)
  }
  function handledelete(index: number): void {
    let filterData = props.meal.filter((v: any, i: number) => i != index)
    dispatch(update({filterData}))
    // setdata(filterData)
  }
  const filterMeal = useSelector((state:any)=> state.meal.filter)
  // setdata(filterMeal)
  console.log(filterMeal)
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">image</th>
            <th scope="col">Title</th>
            <th scope="col">Diets</th>
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
                  <td><img className='user-image' src={data?.image} alt="" /></td>
                  <td className='user-title'>{data?.title}</td>
                  <td className='user-title'>{data?.diets}</td>
                  <td className='user-btn'>
                    <button className='read-btn' onClick={() => handlemodal(data)}>View</button>
                    <button className='remove-btn' onClick={() => handledelete(i)}>&#128465;</button>
                  </td>
                </tr>
              )))}
          {isOpen &&
            <Modalcard currentItem={props.currentItem} isOpen={isOpen} setIsOpen={setIsOpen} />
          }
        </tbody>
      </table>
    </>
  )
}
