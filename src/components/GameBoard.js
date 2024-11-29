import { useState } from "react";

export default function GameBoard({ onNextPlayer, board }) {
  return (
    <ol id="game-board">
      {board.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((symbol, colIdx) => (
              <li key={colIdx}>
                <button
                  onClick={() => onNextPlayer(rowIdx, colIdx)}
                  disabled={!!symbol}
                >
                  {symbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
