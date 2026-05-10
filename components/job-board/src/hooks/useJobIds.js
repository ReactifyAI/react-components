import { useState, useEffect } from 'react'

const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0'

export function useJobIds() {
  const [jobIds, setJobIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchIds() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_BASE_URL}/jobstories.json`)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const ids = await response.json()
        if (!cancelled) setJobIds(ids)
      } catch (err) {
        if (!cancelled) setError('Failed to load job listings. Please try again later')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchIds()

    return () => { cancelled = true }
  }, [])

  return { jobIds, loading, error }

}