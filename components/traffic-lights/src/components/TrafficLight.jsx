import { useState, useEffect } from 'react'
import './TrafficLight.css'

const LIGHTS = {
  red: {
    duration: 4000,
    next: 'green'
  },
  yellow: {
    duration: 500,
    next: 'red'
  },
  green: {
    duration: 3000,
    next: 'yellow'
  }
}

export default function TrafficLight() {

  const [activeLight, setActiveLight] = useState('red') // green to yellow to red

  useEffect(() => {
    // 1. Get the duration for the currently active Light
    const currentDuration = LIGHTS[activeLight].duration

    // 2. Set a timer to switch to the next light configuration
    const timer = setTimeout(() => {
      setActiveLight(LIGHTS[activeLight].next)
    }, currentDuration)

    // 3. Clean up the timer if the component unmounts to prevent memory leaks
    return () => clearTimeout(timer)

  }, [activeLight]) // Re-run this effect every time activeLight updates

  return (
    <main className="container">
      <h1>Traffic Light</h1>

      <div className="light-box" aria-label={`Traffic light showing ${activeLight}`}>
        {Object.keys(LIGHTS).map((light) => (
          <div key={light} className={`light ${activeLight === light ? `${light}-on` : `${light}-off`}`} />
        ))}
      </div>
    </main>
  )
}