
export default function JobItem({ job, index }) {
  const { url, title, by, time } = job

  const date = new Date(time * 1000)
  const isoDate = date.toISOString()
  const displayDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <li className="job-list-item" key={index}>
      <h2 className="job-title">
        {url ? (
          <a
            href={url}
            target="_blank"
            aria-label={`${title} - opens in a new tab`}
            rel="noopener noreferrer"
            className="job-link"
          >
            {title}
          </a>
        ) : (
          {title}
        )}
      </h2>

      <p className="job-meta">
        <span>by {by}</span>
        <span className="dot" aria-hidden="true">.</span>
        <time dateTime={isoDate}>{displayDate}</time>
      </p>
    </li>
  )
}