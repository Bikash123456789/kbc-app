import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import wrong from '../sounds/wrong.mp3'

const Timer = ({ questionNumber, setIsGameOver }) => {
    const [time, setTime] = useState(30);
    const [wrongPlay] = useSound(wrong)

    useEffect(() => {
        if (time === 0) {
            setIsGameOver(true);
            wrongPlay();
            return;
        }
        const interval = setInterval(() => {
            setTime(prev => prev - 1)
        }, 1000);

        return () => {
            clearInterval(interval)
        }
    }, [time, setIsGameOver])

    useEffect(() => {
        setTime(30)
    }, [questionNumber])

    return time;
}

export default Timer