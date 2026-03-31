import { useState } from 'react'

interface UseStarRatingReturn {
  hoverIndex: number | null;
  activeIndex: number;
  handleMouseEnter: (index: number) => void
  handleMouseLeave: () => void
  handleClick: (index: number, onChange: (value: number) => void) => void
}

export default function useStarRating(value: number): UseStarRatingReturn {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  // hover takes priority over the committed value
  const activeIndex = hoverIndex !== null ? hoverIndex : value - 1

  const handleMouseEnter = (index: number): void => {
    setHoverIndex(index)
  }

  const handleMouseLeave = (): void => {
    setHoverIndex(null)
  }

  const handleClick = (index: number, onChange: (value: number) => void) => {
    onChange(index + 1)
  }

  return {
    hoverIndex,
    activeIndex,
    handleMouseEnter,
    handleMouseLeave,
    handleClick
  }
}