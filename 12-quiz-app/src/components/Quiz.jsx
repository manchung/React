import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import Summary from "./Summary";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 0 ≤ j ≤ i
    [array[i], array[j]] = [array[j], array[i]]; // swap
  }
  return array;
}

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  const questionTimer = useRef();

  let activeQuestion, answers, correctAnswer, score;
  if (activeQuestionIndex !== QUESTIONS.length) {
    activeQuestion = QUESTIONS[activeQuestionIndex];
    correctAnswer = activeQuestion.answers[0];
    answers = shuffle([...activeQuestion.answers]);
  }

  const handleSelectAnswer = useCallback(
    (answer) => setUserAnswers((prev) => [...prev, answer]),
    []
  );
  const handleSkip = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (activeQuestion) {
    return (
      <div id="quiz">
        <div id="question">
          <QuestionTimer
            key={`QuestionTimer_${activeQuestionIndex}`}
            ref={questionTimer}
            timeout={3000}
            onTimeout={handleSkip}
          />
          <h2>{activeQuestion.text}</h2>
          <Answers
            key={`Answers_${activeQuestionIndex}`}
            answers={answers}
            correctAnswer={correctAnswer}
            handleSelectAnswer={handleSelectAnswer}
            questionTimer={questionTimer}
          />
        </div>
      </div>
    );
  } else {
    return <Summary userAnswers={userAnswers} />;
  }
}
