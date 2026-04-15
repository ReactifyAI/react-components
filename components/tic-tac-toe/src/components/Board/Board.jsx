import './Board.css'

export default function Board({ tiles, onTileClick, strikeClass }) {
  return (
    <div className="board">
      {tiles.map((tile, i) => (
        <button
          key={i}
          onClick={() => onTileClick(i)}
          className="tile"
        >
          {tile}
        </button>
      ))}

      <div className={`strike ${strikeClass}`}></div>
    </div>
  )
}