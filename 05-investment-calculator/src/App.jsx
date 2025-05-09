import { useState } from "react";
import Header from "./components/Header";
import UserInput from "./components/UserInput";
import Result from "./components/Result";

function App() {

  const [investmentParameters, setInvestmentParameters] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 7,
    duration: 10,
  });

  return (
    <>
      <Header />
      <UserInput
        investmentParameters={investmentParameters}
        setInvestmentParameters={setInvestmentParameters}
      />
      <Result investmentParameters={investmentParameters} />
    </>
  );
}

export default App;
