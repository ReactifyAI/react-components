import useStarRating from "../../useStarRating";
import StarFilled from "./StarRatingIcons/StarFilled"
import StarEmpty from "./StarRatingIcons/StarEmpty"
import '../../App.css'

interface StarRatingProps {
  maxStars: number;
  value: number;
  size: number;
  color?: string;
  emptyColor?: string;
  onChange: (value: number) => void
}

export default function StarRating({
  maxStars = 5,
  value,
  size,
  color = "#F59E0B",
  emptyColor = '#D1D5DB',
  onChange
}: StarRatingProps) {
  const { hoverIndex, activeIndex, handleMouseEnter, handleMouseLeave, handleClick } = useStarRating(value)

  return (
    <div
      onMouseLeave={handleMouseLeave}
      className="starButtonsWrapper"
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const isFilled = i <= activeIndex
        return (
          <button
            key={i}
            aria-checked={i + 1 === value}
            aria-label={`${i + 1} star${i + 1 !== 1 ? 's' : ''}`}
            onMouseEnter={() => handleMouseEnter(i)}
            onClick={() => handleClick(i, onChange)}
            className="starButton"
            style={{
              color: isFilled ? color : emptyColor,
              transform: hoverIndex === i ? 'scale(1.2)' : 'scale(1)'
            }}
          >
            {isFilled ? <StarFilled size={size} fill={color} /> : <StarEmpty size={size} fill={emptyColor} />}
          </button>
        ) 
      })}
      
    </div>
  )
}