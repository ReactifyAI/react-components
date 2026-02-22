import { memo } from 'react'
import { type FAQ } from '../types/faq'
import { ChevronUpDownIcon } from './icons'

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem = memo(function({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <>
      {/* <dt> = the term (question) */}
      <dt className={`faq-item${isOpen ? ' is-open' : ''}`}>
        <button
          className="faq-question-btn"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          <span>{faq.question}</span>
          <ChevronUpDownIcon className="faq-chevron" />
        </button>

        {/* Answer with smooth animation */}
        {/* <dd> = the definition/detail (answer) */}
        <dd className="faq-answer">
          <div className="faq-answer-inner">
            <p>{faq.answer}</p>
          </div>
        </dd>
      </dt>
    </>
  )
})
