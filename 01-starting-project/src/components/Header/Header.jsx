import reactImg from "../../assets/react-core-concepts.png"
import "./Header.css";

const reactDescriptions = ['Fundamental', 'Essential', 'Core', 'Basic', 'Simple'];

function genRandomInt(max) {
  return Math.floor(Math.random() * (max+1));
}

function Header() {
  const description = reactDescriptions[genRandomInt(reactDescriptions.length - 1)]
  return (
    <header>
      <img src={reactImg} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {description} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

export default Header;