import React from 'react'
import { useSelector } from 'react-redux'


export default function Monday() {
    const Mon = useSelector((state: any) => state.meal.Mon);
    console.log(Mon)
    if (Mon.length === 0) {
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
    <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">image</th>
                <th scope="col">Title</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
                {Mon.map((data:any,i:number)=>(
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
    </>
  )
}
