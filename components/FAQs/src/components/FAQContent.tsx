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
    <main className="faq-wrapper">
      <div className="faq-container">
        {/* <header> groups the intro heading — semantic landmark */}
        <header className="faq-header">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about React, TypeScript, and more</p>
        </header>

        {/* <search> is the HTML5 landmark for search UI */}
        <search className="faq-search-wrapper">
          <SearchIcon className="faq-search-icon" />
          <input
            className="faq-search-input"
            type="search"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search questions..."
            aria-label="Search FAQs"
            name="Search FAQs"
          />

          {searchQuery && (
            <button className="faq-search-clear" onClick={onSearchClear} aria-label="Clear search">
              <CloseIcon className="icon" />
            </button>
          )}
        </search>

        {searchQuery && (
          <p className="faq-result-count" aria-live="polite">
            Found {faqs.length} {faqs.length === 1 ? 'result' : 'results'}
          </p>
        )}

        {/* FAQ List or Empty State */}
        {/* <dl> = description list, the right element for Q&A pairs */}
        {faqs.length > 0 ? (
          <dl>
            {faqs.map(faq => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => onToggle(faq.id)}
              />
            ))}
          </dl>
        ) : searchQuery ? (
          <div className="faq-empty" role="status">
            <SadFaceIcon className="icon icon--lg" />
            <h3>No results found</h3>
            <p>Try searching for something else</p>
            <button className="faq-empty-btn" onClick={onSearchClear}>
              Clear Search
            </button>
          </div>
        ) : null}
      </div>
    </main>
  )
}
