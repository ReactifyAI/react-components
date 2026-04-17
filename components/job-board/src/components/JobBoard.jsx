import { useState, useEffect } from 'react'
import './JobBoard.css'

const JOBS_PER_PAGE = 6
const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0'

export default function JobBoard() {
  const [jobIds, setJobIds] = useState([])
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchJobDetails = async (ids, page) => {
    setLoading(true)

    const start = page * JOBS_PER_PAGE
    const end = start + JOBS_PER_PAGE
    const idsToFetch = ids.slice(start, end)

    try {
      const promises = idsToFetch.map(id => fetch(`${API_BASE_URL}/item/${id}.json`).then(res => res.json()))
      
      const newJobs = await Promise.all(promises)
      setJobs(prevJobs => [...prevJobs, ...newJobs])
    } catch (err) {
      setError(`Failed to load job details. Please try again later: ${err}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchJobIds = async () => {
      setLoading(true)

      try {
        const response = await fetch(`${API_BASE_URL}/jobstories.json`)
        const ids = await response.json()
        setJobIds(ids)
        await fetchJobDetails(ids, 0)
      } catch (err) {
        setError(`Failed to load jobs. Please try again later: ${err}`)
      } finally {
        setLoading(false)
      }
    }

    fetchJobIds()
  }, [])

  function loadMore() {
    const nextPage = Math.floor(jobs.length / JOBS_PER_PAGE)
    fetchJobDetails(jobIds, nextPage)
  }

  const hasMore = jobs.length < jobIds.length

  return (
    <main class="job-board-container" aria-label="Hacker News Job Board">
      <div className="job-board-header" aria-live="polite" aria-atomic="true">
        <h1 className="job-board-title">Hacker News Job Board</h1>
        <p className="job-board-subtitle">Latest job postings from Y combinator companies</p>
      </div>

      {error && <p className="error-message" role="alert">{error}</p>}

      <ul className="job-list">
        {jobs.map(job => (
          <li key={job.id} className="job-list-item">
            <h2 className="job-title">
              {job.url ? (
                <a
                  href={job.url}
                  target="_blank"
                  className="job-link"
                  rel="noopener noreferrer"
                  aria-label={`${job.title} opens in a new tab`}
                >
                  {job.title}
                </a>
              ) : (
                job.title
              )}
            </h2>
            <p className="job-posting-meta-data">
              <span>By {job.by}</span>
              <span className="dot" aria-hidden="true" />
              <time dateTime={new Date(job.time * 1000).toISOString()}>
                {new Date(job.time * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </time>
            </p>
          </li>
        ))}
      </ul>

      {loading && <p className="loading-state" aria-live="polite">Loading jobs...</p>}

      {!loading && hasMore && (
        <button
          onClick={loadMore}
          className="load-more-button"
          aria-label="Load more jobs"
        >
          Load More
        </button>
      )}
    </main>
  )
}