import { useEffect } from 'react'
import { useJobIds } from '../hooks/useJobIds'
import { useJobDetails } from '../hooks/useJobDetails'
import JobItem from './JobItem'
import './JobBoard.css'

function Loading() {
  return (
    <p className="loading-state" aria-live="polite" aria-busy="true">Loading jobs...</p>
  )
}

function ErrorMessage({ message }) {
  return (
    <p className="error-message" role="alert" aria-live="assertive">{message}</p>
  )
}

export default function JobBoard() {
  const { jobIds, loading: idsLoading, error: idsError } = useJobIds()
  const {
    jobsList,
    loading: jobsLoading,
    error: jobsError,
    hasMore,
    fetchJobDetails,
    loadMore
  } = useJobDetails(jobIds)

  useEffect(() => {
    if (jobIds.length > 0) {
      fetchJobDetails(jobIds, 0)
    }
  }, [jobIds, fetchJobDetails])

  const isLoading = idsLoading || jobsLoading
  const error = idsError || jobsError

  return (
    <main className="job-board-container" aria-label="Hacker News Job Board">
      <header className="job-board-header">
        <h1 className="job-board-title">Hacker News Job Board</h1>
        <p className="job-board-subtitle">Latest postings from Y Combinator companies</p>
      </header>

      {error && <ErrorMessage message={error} />}

      <ul
        className="job-list"
        aria-label="Job listings"
        aria-live="polite"
        aria-busy={isLoading}
      >
        {jobsList.map(job => (
          <JobItem key={job.id} job={job} index={job.id} />
        ))}
      </ul>

      {isLoading && <Loading />}

      {!isLoading && hasMore && (
        <button
          className="load-more-button"
          onClick={loadMore}
        >
          Load more
        </button>
      )}
    </main>
  )
}