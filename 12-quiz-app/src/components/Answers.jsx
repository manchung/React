import AnswerButton from "./AnswerButton";
import {useState, useEffect} from "react";

export default function Answers({
  answers,
  correctAnswer,
  handleSelectAnswer,
  questionTimer,
}) {
    const [buttonClicked, setButtonClicked] = useState(undefined);
    function handleButtonClick(index) {
        setButtonClicked(index);
    }

    useEffect(() => {
        if (buttonClicked !== undefined) {
            const notifyParentTimer = setTimeout(() => handleSelectAnswer(answers[buttonClicked]), 2000);
            questionTimer.current.cancel();
            return () => {clearTimeout(notifyParentTimer)}
        }
    }, [buttonClicked])

    return (
    <ul id="answers">
      {answers.map((a, i) => (
        <li key={a} className="answer">
          <AnswerButton
            key={a}
            index={i}
            disabled={buttonClicked !== undefined && buttonClicked != i}
            onClick={handleButtonClick}
            isCorrectAnswer={a === correctAnswer}
          >
            {a}
          </AnswerButton>
        </li>
      ))}
    </ul>
  );
}
