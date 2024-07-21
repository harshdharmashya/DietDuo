import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setexpert } from '../../Redux/workoutSlice';
import Modalworkout from '../Modalworkout';


export default function Expert(props: any) {
    const dispatch = useDispatch();
    const [muscle, setmuscle] = useState('');
    const workout = async (difficulty: string) => {
        const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&difficulty=${difficulty}`, { headers: { 'X-Api-Key': 'vUwkaH0pCOAUL4d2BVAPiw==XLQAUW4A9eQ5zjfF' } });
        const data = await response.json();
        dispatch(setexpert(data))

    };
    useEffect(() => {
        workout('expert');
    }, [muscle]);

    // to open modal
    const handleOpen = () => props.setIsOpen(true);

    // transfer the data to the modal
    function handleModal(data: any) {
        props.setCurrentItem(data)
        // console.log(data);
        handleOpen();
    }

    
    const work_out: any = useSelector((state: any) => state.workout.expert)
    // console.log("work_out of beginner: ", work_out)
    if (work_out.length === 0) {
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
            <div className='beginner'>
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
                            <div className='contain-summry-pie workbtn'>
                                <button className='btn-workout'>Add to Meal</button>
                                <button className='btn-workout' onClick={() => handleModal(data)}>Read more..</button>
                            </div>
                        </div>
                    ))
                    }
                    {props.isOpen &&
                        <Modalworkout currentItem={props.currentItem} isOpen={props.isOpen} setIsOpen={props.setIsOpen} />
                    }
                </div>
            </div>
        </>
    )
}
