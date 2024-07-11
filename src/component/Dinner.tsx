import React from 'react'
import { useSelector } from 'react-redux';

export default function Dinner() {
  const meals = useSelector((state: any) => state.counter.Dinner)
  console.log(meals);
  return (
    <>
      <div className='active-meal'>
        {meals?.recipes?.map((data: any, i: number) => (
          <div className="card mb-3 m-2" key={i}>
            <img src={data?.image} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title text-dark">{data?.title}</h5>
              <p className="card-text text-dark">{data?.summary}</p>
              <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>))
        }
      </div>
    </>
  )
}
