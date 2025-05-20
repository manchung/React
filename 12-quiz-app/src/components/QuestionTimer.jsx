import { useState, useEffect, useRef, useImperativeHandle } from "react";

export default function QuestionTimer({ref, timeout, onTimeout}) {
    const [remainingTime, setRemainingTime] = useState(timeout);
    const [mode, setMode] = useState("");
    const timer = useRef();
    useEffect(() => {
        timer.current = setTimeout(onTimeout, timeout);
        // console.log(`const timer = setTimeout(onTimeout, timeout);`)
        const interval = setInterval(() => {
            setRemainingTime(prev => prev - 10)
        }, 10);

        return () => {
            clearTimeout(timer.current);
            clearInterval(interval);
        }
    }, [onTimeout])

    useImperativeHandle(ref, () => ({
        cancel: () => {
            // console.log(`clearing questiontimer timer ${timer.current} `);
            clearTimeout(timer.current);
            setMode("answered");
        },
    }))

    return <div>
        <progress id="question-time" value={remainingTime} max={timeout} className={mode}/>
    </div>
};