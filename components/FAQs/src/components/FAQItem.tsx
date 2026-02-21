import { memo } from 'react'
import { type FAQ } from '../types/faq'
import { ChevronUpDownIcon, InfoIcon } from './icons'

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem = memo(function({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div>
      {/* Question Button */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>
          {faq.question}
        </span>
        
        {/* Animated Arrow Icon */}
        <ChevronUpDownIcon isOpen={isOpen} />
      </button>

      {/* Answer with smooth animation */}
      {isOpen && (
        <div>
          <p>{faq.answer}</p>
          <div>
            <span>
              <InfoIcon />
              Helpful Answer
            </span>
          </div>
        </div>
      )}
    </div>
  )
})
