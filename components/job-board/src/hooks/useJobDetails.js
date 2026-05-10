import { useState, useEffect, useCallback } from 'react'

const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0'
const JOBS_PER_PAGE = 6

export function useJobDetails(jobIds) {
  const [jobsList, setJobsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchJobDetails = useCallback(async (ids, page) => {
    if (ids.length === 0) return

    setLoading(true)
    setError(null)

    const startIndex = page * JOBS_PER_PAGE
    const endIndex = startIndex + JOBS_PER_PAGE

    const jobIdsToFetch = ids.slice(startIndex, endIndex)

    try {
      const promises = jobIdsToFetch.map(id => 
        fetch(`${API_BASE_URL}/item/${id}.json`).then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.json()
        })
      )

      const newJobs = await Promise.all(promises)

      setJobsList(prevJobs => [...prevJobs, ...newJobs])
    } catch (err) {
      setError(`Failed to load job details. Please try again later: ${err}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const loadMore = useCallback(() => {
    const nextPage = Math.floor(jobsList.length / JOBS_PER_PAGE)

    fetchJobDetails(jobIds, nextPage)
  }, [fetchJobDetails, jobIds])

  const hasMore = jobsList.length < jobIds.length

  return { jobsList, loading, error, hasMore, fetchJobDetails, loadMore }
}