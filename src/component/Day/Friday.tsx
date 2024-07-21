import React from 'react'
import { useSelector } from 'react-redux'

export default function Friday() {
  const Fri = useSelector((state:any)=>state.meal.Fri)
  return (
    <table className="table">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Image</th>
      <th scope="col">Title</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    {Fri.map((data:any,i:number)=>(
      <tr key={i}>
      <th scope="row">{i+1}</th>
      <td><img className='user-image' src={data?.image} alt="" /></td>
      <td className='user-title'>{data?.title}</td>
      <td>
          <button className='read-btn'>Read more</button> <br />
          <button className='remove-btn'>Remove</button>
      </td>
    </tr>
    ))}
  </tbody>
</table>
  )
}
