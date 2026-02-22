import { ErrorIcon } from './icons'

interface FAQErrorProps {
  message: string
}

export function FAQError({ message }: FAQErrorProps) {
  return (
    <div className="faq-error">
      <ErrorIcon className="icon icon--lg" />
      <h3>Error Loading FAQs</h3>
      <p>{message}</p>
      <button className="faq-error-btn" onClick={() => window.location.reload()}>
        Try Again
      </button>
    </div>
  )
}
