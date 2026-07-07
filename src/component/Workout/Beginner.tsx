import { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { setBeginner } from '../../Redux/workoutSlice';
import Modalworkout from '../Modalworkout';
import Addtoworkout_Modal from '../Addtoworkout_Modal';
import { Heart, Footprints, BicepsFlexed, Dumbbell, Hand, PersonStanding, Bone } from "lucide-react";
import { Skeleton } from '@mui/material';

export const MUSCLE_LIST = [
    'adductors', 'biceps', 'calves', 'chest',
    'forearms', 'glutes', 'hamstrings', 'lats',
    'lower_back', 'middle_back', 'triceps'
];

export const MUSCLE_ICONS: Record<string, React.ReactNode> = {
    abdominals: <Heart size={18} />,
    adductors: <PersonStanding size={18} />,
    biceps: <BicepsFlexed size={18} />,
    calves: <Footprints size={18} />,
    chest: <Heart size={18} />,
    forearms: <Hand size={18} />,
    glutes: <PersonStanding size={18} />,
    hamstrings: <PersonStanding size={18} />,
    lats: <Dumbbell size={18} />,
    lower_back: <Bone size={18} />,
    middle_back: <Bone size={18} />,
    triceps: <Dumbbell size={18} />,
};

export default function Beginner(props: any) {
    const dispatch = useDispatch();
    const [muscle, setMuscle] = useState('');
    const [isOpenAdd, setIsOpenAdd] = useState(false);

    const workout = async (difficulty: string) => {
        // const response = await fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}&difficulty=${difficulty}`, { headers: { 'X-Api-Key': 'vUwkaH0pCOAUL4d2BVAPiw==XLQAUW4A9eQ5zjfF' } });
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/exercies?difficulty=${difficulty}&muscle=${muscle}`);
        const data = response.data;
        dispatch(setBeginner(data))

    };
    useEffect(() => {
        workout('beginner');
    }, [muscle]);

    function handleAddworkout(data: any) {
        props.setCurrentItem(data);
        setIsOpenAdd(true);
    }

    function handleModal(data: any) {
        props.setCurrentItem(data);
        props.setIsOpen(true);
    }

    const work_out: any = useSelector((state: any) => state.workout.Beginner);

    if (!work_out || work_out.length === 0) {
        return (
            <div className="workout-section" style={{ marginTop: '2rem' }}>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                    <div className="cardwork" key={n}>
                        <Skeleton variant="text" width={60} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', mb: 2, borderRadius: 1 }} />
                        <Skeleton variant="text" width="80%" height={32} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', mb: 3 }} />
                        
                        <div className="cardwork-meta">
                            {[1, 2, 3].map((m) => (
                                <div className="cardwork-meta-item" key={m}>
                                    <Skeleton variant="text" width={40} height={16} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', mb: 0.5 }} />
                                    <Skeleton variant="text" width={80} height={20} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                                </div>
                            ))}
                        </div>
                        <div className="cardwork-actions">
                            <Skeleton variant="rounded" width="45%" height={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                            <Skeleton variant="rounded" width="45%" height={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            {/* Muscle filter bar */}
            <div className="muscle-filter-bar">
                <span className="muscle-filter-label">Target muscle</span>
                <div className="muscle-chips">
                    {MUSCLE_LIST.map((m) => (
                        <button
                            key={m}
                            className={`muscle-chip${muscle === m ? ' active' : ''}`}
                            onClick={() => setMuscle(m)}
                        >
                            {MUSCLE_ICONS[m]} {m.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Cards grid */}
            <div className="workout-section">
                {work_out.map((data: any, i: number) => (
                    <div className="cardwork" key={i}>
                        <div className="cardwork-badge">{data.type}</div>
                        <h2 className="cardwork-title">{data.name}</h2>
                        <div className="cardwork-meta">
                            <div className="cardwork-meta-item">
                                <span className="meta-label">Equipment</span>
                                <span className="meta-value">{data.equipment}</span>
                            </div>
                            <div className="cardwork-meta-item">
                                <span className="meta-label">Muscle</span>
                                <span className="meta-value">{data.muscle}</span>
                            </div>
                            <div className="cardwork-meta-item">
                                <span className="meta-label">Difficulty</span>
                                <span className="meta-value difficulty-badge">Beginner</span>
                            </div>
                        </div>
                        <div className="cardwork-actions">
                            <button className="btn-add-workout" onClick={() => handleAddworkout(data)}>
                                + Add to plan
                            </button>
                            <button className="btn-read-more" onClick={() => handleModal(data)}>
                                Read more
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {props.isOpen && (
                <Modalworkout
                    currentItem={props.currentItem}
                    setCurrentItem={props.setCurrentItem}
                    isOpen={props.isOpen}
                    setIsOpen={props.setIsOpen}
                />
            )}
            {isOpenAdd && (
                <Addtoworkout_Modal
                    currentItem={props.currentItem}
                    setCurrentItem={props.setCurrentItem}
                    isOpenAdd={isOpenAdd}
                    setIsOpenAdd={setIsOpenAdd}
                />
            )}
        </>
    );
}