import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setBeginner } from '../../Redux/workoutSlice';
import Modalworkout from '../Modalworkout';
import Addtoworkout_Modal from '../Addtoworkout_Modal';


export default function Beginner(props: any) {
    const dispatch = useDispatch();
    const [muscle, setmuscle] = useState('');
    // for open modal for Add to cart
    const [isOpenAdd, setIsOpenAdd] = useState(false);
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
        dispatch(setBeginner(data))

    };
    useEffect(() => {
        workout('beginner');
    }, [muscle]);
    const handleOpen = () => props.setIsOpen(true);
    const handleWork = () => setIsOpenAdd(true);

    // for open Add to workout modal
    function handleAddworkout(data: any){
        props.setCurrentItem(data);
        handleWork();
    }

    // for choose muscle 
    const handleChange = (e: any) => {
        setmuscle(e.target.value);
    }
    // to transfer the data to modal
    function handleModal(data: any) {
        props.setCurrentItem(data)
        // console.log(data);
        handleOpen();
    }


    const work_out: any = useSelector((state: any) => state.workout.Beginner)
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
                <div className="btn-group muscles">
                    <span style={{ width: 70, display: 'flex', alignItems: 'center' }}>Muscle : </span><select className='dropdown-muscle' value={muscle}
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
                            <div className='contain-summry-pie workbtn'>
                                <button className='btn-workout' onClick={()=>handleAddworkout(data)}>Add to Meal</button>
                                <button className='btn-workout' onClick={() => handleModal(data)}>Read more..</button>
                            </div>
                        </div>
                    ))}

                    {props.isOpen &&
                        <Modalworkout currentItem={props.currentItem} isOpen={props.isOpen} setIsOpen={props.setIsOpen} />
                    }
                    {isOpenAdd && 
                        <Addtoworkout_Modal currentItem={props.currentItem} isOpenAdd={isOpenAdd} setIsOpenAdd={setIsOpenAdd} />
                    }

                </div>
            </div>
        </>
    )
}