import { useState } from 'react'
import Board from './Board/Board'
import './Board/Board.css'

const PLAYER_X = "X";
const PLAYER_O = "O";

const WINNING_COMBINATIONS = [
  // row combinations
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  // column combination
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  // diagonal combination
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
]

function getGameStatus(tiles) {
  for (const { combo, strikeClass } of WINNING_COMBINATIONS) {
    const [a, b, c] = combo

    if (tiles[a] && tiles[a] === tiles[b] && tiles[a] === tiles[c]) {
      return { winner: tiles[a], strikeClass }
    }
  }

  const isDraw = tiles.every(tile => tile !== null)

  return { winner: null, strikeClass: null, isDraw }
}


export default function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null))
  const [playerXIsNext, setPlayerXIsNext] = useState(true)

  const currentPlayer = playerXIsNext ? PLAYER_X : PLAYER_O

  const { winner, strikeClass, isDraw } = getGameStatus(tiles)

  const handleTileClick = (index) => {
    if (winner || isDraw || tiles[index]) return
    const newTiles = [...tiles]
    newTiles[index] = currentPlayer
    setTiles(newTiles)
    setPlayerXIsNext(!playerXIsNext)
  }

  const handleReset = () => {
    if (!winner && !isDraw) {
      if (!window.confirm("Reset game in progress?")) return
    }

    setTiles(Array(9).fill(null))
    setPlayerXIsNext(true)
  }

  return (
    <div className="app-container">
      <h1>Tic Tac Toe Game</h1>
      <div>
        { winner ? `Winner: PLAYER ${winner}` : isDraw ? "It's a Draw": `Next Player: ${currentPlayer}`}
      </div>

      <Board
        tiles={tiles}
        onTileClick={handleTileClick}
        strikeClass={strikeClass}
      />

      <button onClick={handleReset} className="reset-button">Reset Game</button>
    </div>
  )
}