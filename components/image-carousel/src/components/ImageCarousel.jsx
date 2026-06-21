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
        <button onClick={handlePrevious}>Previous</button>
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
        />
        <button onClick={handleNext}>Next</button>
      </div>
    

      <div className="pagination">
        {images.map((image, index) => (
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