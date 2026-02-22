export function CloseIcon({ className } : { className?: string }) {
  return (
    <svg
      aria-labelledby="clear-search-button"
      role="button"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <title id="clear-search-button">Clear search button</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}
