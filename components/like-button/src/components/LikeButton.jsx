import { useState } from 'react'
import SpinnerIcon from '../assets/SpinnerIcon'
import HeartIcon from '../assets/HeartIcon'
import './LikeButton.css'

export default function LikeButton() {
  // Core component states
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLikeToggling = async () => {
    // Prevent accidental double-submission while a request is pending
    if (isLoading) return

    setIsLoading(true)
    setErrorMessage(null) // Clear previous errors

    const targetAction = isLiked ? 'unlike' : 'like'

    try {
      const response = await fetch('https://questions.greatfrontend.com/api/questions/like-button', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: targetAction })
      })

      const data = await response.json()

      if (response.ok) {
        setIsLiked(!isLiked)
      } else {
        setErrorMessage(data.message || 'Something went wrong.')
      }
    } catch (error) {
      setErrorMessage(`Network error during attemped ${targetAction}. Please try again later.`)
    } finally {
      setIsLoading(false)
    }
  }

  const iconColor = isLiked ? '#f00' : '#888'
  const buttonBorderColor = isLiked ? '#f00' : '#888'

  return (
    <div className="wrapper">
      <button
        onClick={handleLikeToggling}
        disabled={isLoading}
        className="like-button"
        style={{
          borderColor: buttonBorderColor,
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
        aria-label={isLiked ? 'Unlike this item' : 'Like this item' }
        aria-pressed={isLiked}
      >
        {isLoading ? (
          <span className="spinner-wrapper">
            <SpinnerIcon className="spinner" />
            ...Loading
          </span>
        ) : (
          <span className="content-wrapper">
            <HeartIcon className="heart-icon" style={{ fill: iconColor }} />
            <span style={{ color: iconColor }}>{isLiked ? 'Liked' : 'Like'}</span>
          </span>
        )}
      </button>

      {/* Conditional error message block */}
      {errorMessage && (
        <div
          role="alert"
          className="error-message"
        >
          {errorMessage}
        </div>
      )}
    </div>
  )
}