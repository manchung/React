import {useState, useEffect} from 'react';

export default function AnswerButton({ index, onClick, isCorrectAnswer, disabled, children }) {
    const [buttonState, setButtonState] = useState(undefined);

    useEffect(() =>{
        if (buttonState === 'selected') {
            const gradeAnswerTimer = setTimeout(() => {
                if (isCorrectAnswer) {
                    setButtonState('correct');
                } else {
                    setButtonState('wrong');
                }
            }, 1000);
            return () => {clearTimeout(gradeAnswerTimer)}
        }
    }, [buttonState]);

    return (
    <button className={buttonState} disabled={disabled} onClick={()=>{
        setButtonState('selected');
        onClick(index);
        }}>
        {children}
    </button>
    )
}