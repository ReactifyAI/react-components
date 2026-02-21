import { ErrorIcon } from './icons'

interface FAQErrorProps {
  message: string
}

export function FAQError({ message }: FAQErrorProps) {
  return (
    <div>
      <ErrorIcon />
      <div>
        <h3>Error Loading FAQs</h3>
        <p>{message}</p>
      </div>
      <button onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  )
}
