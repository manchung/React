import quizLogoImg from "../assets/quiz-logo.png";

export default function Header() {
    return <header>
        <img src={quizLogoImg}/>
        <h1>ReactQuiz</h1>
    </header>
}