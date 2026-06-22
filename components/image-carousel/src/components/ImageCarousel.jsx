import { useState } from 'react'
import './ImageCarousel.css'

export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const currentImage = images[currentIndex]
  const nextImage = nextIndex !== null ? images[nextIndex] : null

  const goTo = (index) => {
    if (isAnimating) return;

    setNextIndex(index)

    requestAnimationFrame(() => {
      setIsAnimating(true)
    })
  }

  const handleNext = () => {
    goTo((currentIndex + 1) % images.length)
  }

  const handlePrevious = () => {
    goTo((currentIndex - 1 + images.length) % images.length)
  }

  const handleAnimationEnd = () => {
    if (nextIndex === null) return;

    setCurrentIndex(nextIndex)
    setNextIndex(null)
    setIsAnimating(false)
  }

  const shouldTransitionToLeft = (curr, next, len) => {
    // last -> first
    if (curr === len - 1 && next === 0) {
      return true
    }

    // first -> last
    if (curr === 0 && next === len - 1) {
      return false
    }

    return curr < next
  }

  const isNextDirection = nextIndex !== null && shouldTransitionToLeft(currentIndex, nextIndex, images.length)

  return (
    <div className="carousel">
      <div className="image-container">
        <button onClick={handlePrevious} className="nav-button prev">&lt;</button>

        <div className="viewport">
            <img
              key={currentImage.id}
              src={currentImage.src}
              alt={currentImage.alt}
              className={`image ${isAnimating ? isNextDirection ? 'exit-left': 'exit-right' : ''}`}
            />

            {nextIndex !== null && (
              <img
                key={nextImage.id}
                src={nextImage.src}
                alt={nextImage.alt}
                className={`image ${!isAnimating ? isNextDirection ? 'enter-right' : 'enter-left' : ''}`}
                onTransitionEnd={handleAnimationEnd}
              />
            )}

        </div>

        <button onClick={handleNext} className="nav-button next">&gt;</button>
      </div>
    

      <div className="pagination">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className="pagination-buttons"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
