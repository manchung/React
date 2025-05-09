import {calculateInvestmentResults, formatter} from '../util/investment';

export default function Result({investmentParameters}) {
    const annualData = calculateInvestmentResults(investmentParameters);
    const {initialInvestment, annualInvestment} = investmentParameters;
    let totalInterest = 0;

    return (
        <>
        {investmentParameters.duration < 1 && <p className="center">Invalid duration: Must be at least 1</p>}
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest(Year)</th>
                    <th>Total Interest</th>
                    <th>Investment Capital</th>
                </tr>
            </thead>
            <tbody>
                {annualData.map((data) => (
                    <tr key={data.year}>
                        <td>{data.year}</td>
                        <td>{formatter.format(data.valueEndOfYear)}</td>
                        <td>{formatter.format(data.interest)}</td>
                        <td>{formatter.format(totalInterest += data.interest)}</td>
                        <td>{formatter.format(annualInvestment * data.year + initialInvestment)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}