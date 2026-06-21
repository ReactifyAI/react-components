import { useState } from 'react'
import './ImageCarousel.css'

export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % images.length)
  }

  return (
    <div className="carousel">
      <div className="image-container">
        <button onClick={handlePrevious} className="nav-button prev">&lt;</button>

        <div className="viewport">
          <div
            className="slides"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {images.map((image) => (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
              />
            ))}
          </div>
        </div>

        <button onClick={handleNext} className="nav-button next">&gt;</button>
      </div>
    

      <div className="pagination">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="pagination-buttons"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}