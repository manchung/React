export default function UserInput({investmentParameters, setInvestmentParameters,}) {
  const { initialInvestment, annualInvestment, expectedReturn, duration } =
    investmentParameters;

  function onChange(event) {
    const newValue = event.target.value;
    const name = event.target.name;
    setInvestmentParameters((prev) => ({
      ...prev,
      [name]: Number(newValue),
    }));
    // console.log(investmentParameters)
  }

  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>Initial Investment</label>
          <input
            type="number"
            name="initialInvestment"
            value={initialInvestment}
            onChange={onChange}
            step="100"
          />
        </p>
        <p>
          <label>Annual Investment</label>
          <input
            type="number"
            name="annualInvestment"
            value={annualInvestment}
            onChange={onChange}
            step="10"
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>Expected Return</label>
          <input
            type="number"
            name="expectedReturn"
            value={expectedReturn}
            onChange={onChange}
            step="0.01"
          />
        </p>
        <p>
          <label>Duration</label>
          <input
            type="number"
            name="duration"
            value={duration}
            onChange={onChange}
            step="1"
          />
        </p>
      </div>
    </section>
  );
}
