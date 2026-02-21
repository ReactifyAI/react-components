import { type FAQ } from '../types/faq'
import { FAQItem } from './FAQItem'
import { CloseIcon } from './icons'

interface FAQContentProps {
  faqs: FAQ[]
  openId: number | null
  searchQuery: string
  onToggle: (id: number) => void
  onSearchChange: (query: string) => void
  onSearchClear: () => void
}

export function FAQContent({
  faqs,
  openId,
  searchQuery,
  onToggle,
  onSearchChange,
  onSearchClear
}: FAQContentProps) {
  return (
    <div>
      <div>
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about React, TypeScript, and more</p>
      </div>
      <div>
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search..."
          />

          {searchQuery && (
            <button onClick={onSearchClear}>
              <CloseIcon />
            </button>
          )}
        </div>
        {searchQuery && (
          <p>
            Found {faqs.length} {faqs.length === 1 ? 'result' : 'results'}
          </p>
        )}
      </div>

      {faqs.length > 0 ? (
        <div>
          {faqs.map(faq => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => onToggle(faq.id)}
            />
          ))}
        </div>
      ) : searchQuery ? (
        <div>
          <h3>No results found</h3>
          <p>Try searching for something else</p>
          <button onClick={onSearchClear}>Clear Search</button>
        </div>
      ) : null}
    </div>
  )
}
