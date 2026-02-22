import { type FAQ } from '../types/faq'
import { FAQItem } from './FAQItem'
import { SearchIcon, CloseIcon, SadFaceIcon } from './icons'
import '../styles/FAQ.css'

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
    <div className="faq-wrapper">
      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about React, TypeScript, and more</p>
        </div>

        {/* Search */}
        <div className="faq-search-wrapper">
          <SearchIcon className="faq-search-icon" />
          <input
            className="faq-search-input"
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search..."
          />

          {searchQuery && (
            <button className="faq-search-clear" onClick={onSearchClear}>
              <CloseIcon className="icon" />
            </button>
          )}
        </div>

        {searchQuery && (
          <p className="faq-result-count">
            Found {faqs.length} {faqs.length === 1 ? 'result' : 'results'}
          </p>
        )}

        {/* FAQ List or Empty State */}
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
          <div className="faq-empty">
            <SadFaceIcon className="icon icon--lg" />
            <h3>No results found</h3>
            <p>Try searching for something else</p>
            <button className="faq-empty-btn" onClick={onSearchClear}>
              Clear Search
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}
