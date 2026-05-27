import React, { useState, useRef, useEffect } from 'react'
import './StopWatch.css'

export default function StopWatch() {
  // State for values that must trigger a UI re-render when changed
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Refs for values that change constantly but shouldn't trigger re-renders
  const timerRef = useRef(null)
  const startTimeRef = useRef(0)

  const handleStartStop = () => {
    if (isRunning) {
      // STOP LOGIC
      clearInterval(timerRef.current)
      setIsRunning(false)
    } else {
      // START LOGIC
      setIsRunning(true)

      // Capture the baseline exact time wwhen the button was clicked
      startTimeRef.current = Date.now() - time

      timerRef.current = setInterval(() => {
        // Calculate elapsed time precisely by comparing current time to the start anchor
        setTime(Date.now() - startTimeRef.current)
      }, 10) // Update roughly every 100 milliseconds
    }
  }

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10)

    const pad = (num) => String(num).padStart(2, '0')

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`
  
  }

  const handleReset = () => {
    clearInterval(timerRef.current)
    setIsRunning(false)
    setTime(0)
    startTimeRef.current = 0
  }

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <div className="stopwatch-container">
      <div className="timer-display">{formatTime(time)}</div>

      <div className="button-container">
        <button
          onClick={handleStartStop}
          className={`btn ${isRunning ? 'btn-stop' : 'btn-start'}`}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleReset} className="btn btn-reset">
          Reset
        </button>
      </div>
    </div>
  )

}
