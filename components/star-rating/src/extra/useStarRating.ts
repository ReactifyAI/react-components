import { useState } from "react";

interface UseStarRatingReturn {
  hoverIndex: number | null;
  activeIndex: number;
  handleMouseEnter: (index: number) => void;
  handleMouseLeave: () => void;
  handleClick: (index: number, onChange?: (value: number) => void) => void;
}

/**
 * useStarRating
 *
 * Encapsulates hover + selection logic for a star rating widget.
 * The committed `value` is kept as a controlled prop from the parent;
 * only transient hover state lives inside this hook.
 *
 * @param value - The current committed rating from the parent
 */
export default function useStarRating(value: number): UseStarRatingReturn {
  // null  → not hovering (fall back to committed value)
  // number → index of the star currently being hovered
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Hover takes priority over the committed value.
  const activeIndex = hoverIndex !== null ? hoverIndex : value - 1;

  const handleMouseEnter = (index: number): void => setHoverIndex(index);
  const handleMouseLeave = (): void => setHoverIndex(null);
  const handleClick = (index: number, onChange?: (value: number) => void): void => {
    onChange?.(index + 1);
  };

  return {
    hoverIndex,
    activeIndex,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  };
}
