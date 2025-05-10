import { useState, useRef } from 'react';
import ResultModal from './ResultModal';


export default function TimerChallenge({title, targetTime }) {
    const [remainingTime, setRemainingTime] = useState(targetTime * 1000);
    
    const timer = useRef();
    const resultModal = useRef();
    const timerIsActive = remainingTime > 0 && remainingTime < targetTime * 1000;
    
    const [, setTick] = useState(0);
    const forceUpdate = () => setTick(tick => tick + 1);

    if (remainingTime <= 0) {
        clearInterval(timer.current);
        resultModal.current.open();
    }

    function startTimer() {
        timer.current = setInterval(() => {
            setRemainingTime((prev) => {
                return prev - 10;
            });
        }, 10);
    }

    function stopTimer() {
        clearInterval(timer.current);
        resultModal.current.open();
    }

    function resetTimer() {
        setRemainingTime(targetTime * 1000);
    }

    return (
      <>
        <ResultModal
          ref={resultModal}
          remainingTime={remainingTime}
          targetTime={targetTime}
          resetTimer={resetTimer}
        />
        <section className="challenge">
          <h2>{title}</h2>
          <p className="challenge-time">
            {targetTime} second{targetTime > 1 ? "s" : ""}
          </p>
          <p>
            <button onClick={timerIsActive ? stopTimer : startTimer}>
              {timerIsActive ? "Stop" : "Start"} Challenge
            </button>
          </p>
          <p className={timerIsActive ? "active" : undefined}>
            {timerIsActive ? "Timer is running..." : "Timer inactive"}
          </p>
        </section>
      </>
    );
}