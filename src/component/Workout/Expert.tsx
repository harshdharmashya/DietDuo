import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBeginner, setexpert } from '../../Redux/workoutSlice';


export default function Expert(props: any) {
    const dispatch = useDispatch();
    useEffect(() => {
        const workout = async (difficulty: string) => {
            const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=chest&difficulty=${difficulty}`, { headers: { 'X-Api-Key': 'vUwkaH0pCOAUL4d2BVAPiw==XLQAUW4A9eQ5zjfF' } });
            const data = await response.json();
            console.log("api data : ", data)
            dispatch(setexpert(data))
        };
        workout('beginner');
    }, []);
    const handleOpen = () => props.setIsOpen(true);

    function handleModal(data: any) {
        props.setCurrentItem(data)
        handleOpen();
    }
    const work_out: any = useSelector((state: any) => state.workout.expert)
    console.log("work_out of expert: ", work_out)
    return (
        <>
            <div className='workout-section'>
                {work_out.map((data: any, i: number) => (
                    (i == 0 || i == 1 || i == 3 || i == 4 || i == 5 || i == 6) &&
                    <div className="cardwork" key={i}>
                        <h2>{data.name}</h2>
                        <p className="equipment"><strong>Equipment : </strong>{data.equipment}</p>
                        <p className="muscle"><strong>Muscle : </strong>{data.muscle}</p>
                        <p className="type"><strong>Type : </strong>{data.type}</p>
                        <button className='btn-Add-to-meal view-button'>View</button>
                    </div>
                ))
                }
            </div>
        </>
    )
}
