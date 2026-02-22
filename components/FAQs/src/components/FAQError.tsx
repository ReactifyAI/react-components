import { ErrorIcon } from './icons'

interface FAQErrorProps {
  message: string
}

export function FAQError({ message }: FAQErrorProps) {
  return (
    <div className="faq-error" role="alert">
      <ErrorIcon className="icon icon--lg" />
      <h2>Error Loading FAQs</h2>
      <p>{message}</p>
      <button className="faq-error-btn" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  )
}
