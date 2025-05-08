import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

function getActivePlayer(turns) {
  if (turns.length === 0) {
    return "X";
  }
  const lastTurn = turns[0];
  return lastTurn.player === "X" ? "O" : "X";
}

function getGameBoard(turns) {
  const gameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  for (let turn of turns) {
    const { row, col } = turn.square;
    gameBoard[row][col] = turn.player;
  }
  return gameBoard;
}

function checkForWinner(board) {
  for (let combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (
      board[a.row][a.column] &&
      board[a.row][a.column] === board[b.row][b.column] &&
      board[a.row][a.column] === board[c.row][c.column]
    ) {
      return board[a.row][a.column];
    }
  }
  return null;
}



function App() {
  const [players, setPlayers] = useState({ X: "Player 1", O: "Player 2" });
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = getActivePlayer(gameTurns);
  const gameBoard = getGameBoard(gameTurns);
  const winner = checkForWinner(gameBoard);
  const drawn = gameTurns.length === 9 && !winner;

  function onSelectSquare(rowIndex, colIndex) {
    setGameTurns((prev) => {
      let currPlayer = getActivePlayer(prev);
      const newTurn = {
        player: currPlayer,
        square: { row: rowIndex, col: colIndex },
      };
      return [newTurn, ...prev];
    });
  }

  function changePlayerName(symbol, newName) {
    setPlayers((prev) => {
      return {
        ...prev,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players["X"]}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={changePlayerName}
          />
          <Player
            name={players["O"]}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={changePlayerName}
          />
        </ol>
        {(winner || drawn) && (
          <GameOver winner={players[winner]} onClick={() => setGameTurns([])} />
        )}
        <GameBoard onSelectSquare={onSelectSquare} board={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;
