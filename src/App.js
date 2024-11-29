import { useState } from "react";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./winningCombinations";

const INITIAL_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function setActivePlayer(turns) {
  let currPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function checkWinner(board, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const first = board[combination[0].row][combination[0].column];
    const second = board[combination[1].row][combination[1].column];
    const third = board[combination[2].row][combination[2].column];

    if (first && first === second && first === third) {
      winner = players[first];
    }
  }
  return winner;
}

function setBoard(turns) {
  let board = [...INITIAL_BOARD.map((array) => [...array])];
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    board[row][col] = player;
  }
  return board;
}

function App() {
  const [turns, setTurns] = useState([]);
  const activePlayer = setActivePlayer(turns);
  const [players, setPlayers] = useState(PLAYERS);

  let board = setBoard(turns);

  let winner = checkWinner(board, players);

  const draw = turns.length == 9 && !winner;

  function handleActivePlayer(rowIdx, colIdx) {
    setTurns((prevTurn) => {
      const currPlayer = setActivePlayer(prevTurn);
      const updatedTurn = [
        { square: { row: rowIdx, col: colIdx }, player: currPlayer },
        ...prevTurn,
      ];
      return updatedTurn;
    });
  }

  function handleRematch() {
    setTurns([]);
  }

  function handlePLayerNameChange(symbol, newName) {
    setPlayers((oldNames) => {
      return { ...oldNames, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            onPlayerNameChange={handlePLayerNameChange}
            isActive={activePlayer === "X"}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            onPlayerNameChange={handlePLayerNameChange}
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} rematch={handleRematch} />
        )}
        <GameBoard onNextPlayer={handleActivePlayer} board={board} />
      </div>
      <Log turns={turns} />
    </main>
  );
}

export default App;
