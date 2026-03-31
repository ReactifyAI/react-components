import useStarRating from "../../hooks/useStarRating";
import StarEmpty from "./StarEmpty";
import StarFilled from "./StarFilled";
import styles from "./StarRating.module.css";

interface StarRatingProps {
  maxStars?: number;
  value?: number;
  onChange?: (value: number) => void;
  size?: number;
  color?: string;
  emptyColor?: string;
}

/**
 * StarRating
 *
 * Fully controlled, reusable star rating widget.
 *
 * @param maxStars   - Total stars to render (default: 5)
 * @param value      - Current committed rating (default: 0)
 * @param onChange   - Fired when user clicks a star: (newValue: number) => void
 * @param size       - Star icon size in px (default: 32)
 * @param color      - Filled star colour (default: "#F59E0B")
 * @param emptyColor - Empty star colour (default: "#D1D5DB")
 */
export default function StarRating({
  maxStars = 5,
  value = 0,
  onChange,
  size = 32,
  color = "#F59E0B",
  emptyColor = "#D1D5DB",
}: StarRatingProps) {
  const { hoverIndex, activeIndex, handleMouseEnter, handleMouseLeave, handleClick } =
    useStarRating(value);

  return (
    <div
      className={styles.container}
      role="radiogroup"
      aria-label="Star rating"
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const isFilled = i <= activeIndex;

        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={i + 1 === value}
            aria-label={`${i + 1} star${i + 1 !== 1 ? "s" : ""}`}
            className={styles.star}
            style={{
              width: size,
              height: size,
              color: isFilled ? color : emptyColor,
              transform: hoverIndex === i ? "scale(1.2)" : "scale(1)",
            }}
            onMouseEnter={() => handleMouseEnter(i)}
            onClick={() => handleClick(i, onChange)}
          >
            {isFilled ? <StarFilled size={size} /> : <StarEmpty size={size} />}
          </button>
        );
      })}
    </div>
  );
}
