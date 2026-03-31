import { useState } from 'react'
import StarRating from './components/StarRating/StarRating'
import './App.css'

interface DemoItem {
  label: string;
  maxStars: number;
  initial: number;
  size: number;
  color?: string;
}

const DEMOS: DemoItem[] = [
  { label: "Overall Experience", maxStars: 5, initial: 2, size: 24 },
  { label: "Product Quality", maxStars: 5, initial: 1, size: 24 },
  { label: "Customer Support", maxStars: 10, initial: 8, size: 24 }
]

type Ratings = Record<string, number>

function App() {
  const [ratings, setRatings] = useState<Ratings>(
    Object.fromEntries(DEMOS.map(d => [d.label, d.initial]))
  )

  const handleChange = (label: string, newValue: number): void => {
    setRatings(prev => ({ ...prev, [label]: newValue }))
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">Rate your experience</h1>
        <div className="list">
          {DEMOS.map(demo => (
            <div key={demo.label} className="row">
              <div className="labelWrap">
                <span className="label">{demo.label}</span>
                <span className="badge">{demo.label} / {demo.maxStars}</span>
              </div>
              <StarRating
                maxStars={demo.maxStars}
                value={ratings[demo.label]}
                size={demo.size ?? 32}
                color={demo.color ?? '#F59E0B'}
                onChange={e => handleChange(demo.label, e)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
