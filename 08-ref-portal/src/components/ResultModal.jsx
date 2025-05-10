import { useRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom'

export default function ResultModal({ref, remainingTime, targetTime, resetTimer}) {
    const dialog = useRef();
    useImperativeHandle(ref, () => ({
        open: () => dialog.current.showModal(),
    }));

    // const result = remainingTime > 0 ? "won" : "lost";
    const remainingTimeInSeconds = (remainingTime / 1000);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    return createPortal(
      <dialog ref={dialog} className="result-modal" onClose={resetTimer}>
        <h2>{remainingTime <= 0 ? "You lost" : "Your score: " + score}</h2>
        <p>
          The target time was <strong>{targetTime}</strong> seconds.
        </p>
        <p>
          You stopped the timer with <strong>{remainingTimeInSeconds}</strong>{" "}
          seconds left
        </p>
        <form method="dialog" onSubmit={resetTimer}>
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById("modal")
    );
}