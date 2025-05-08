export default function Log({gameTurns}) {
    return (
        <ol id="log">
            {gameTurns.map((turn, index) => (
                <li key={index}>
                    <span className="player">{turn.player}</span>
                    <span className="action">selected</span>
                    <span className="square">{`[${turn.square.row}, ${turn.square.col}]`}</span>
                </li>
            ))}

        </ol>
    )
}