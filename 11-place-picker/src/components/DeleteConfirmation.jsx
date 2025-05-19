import { useEffect, useState } from "react";

export default function DeleteConfirmation({ timeout, onConfirm, onCancel }) {
  const [remainingTime, setRemainingTime] = useState(timeout);
  useEffect(() => {
    const timer = setTimeout(onConfirm, timeout);
    const interval = setInterval(() => {
      setRemainingTime(prev => prev - 10)
    }, 10);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value={remainingTime} max={timeout} />
    </div>
  );
}
