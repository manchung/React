import quizCompletedImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions";

export default function Summary({ userAnswers }) {
  const numQuestions = QUESTIONS.length;
  const correct = userAnswers.reduce(
    (acc, elt, idx) => (elt === QUESTIONS[idx].answers[0] ? acc + 1 : acc),
    0
  );
  const skipped = userAnswers.filter((e) => e === null).length;
  const correctPercentage = (correct * 100) / numQuestions;
  const skippedPercentage = (skipped * 100) / numQuestions;

  return (
    <div id="summary">
      <img src={quizCompletedImg} />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedPercentage.toFixed(0)}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctPercentage.toFixed(0)}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">
            {(100 - correctPercentage - skippedPercentage).toFixed(0)}%
          </span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
            let className = "user-answer ";
            if (answer === null) {
                className += "skipped";
            } else if (answer === QUESTIONS[index].answers[0]) {
                className += "correct";
            } else {
                className += "wrong";
            }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={className}>{answer ?? "skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
