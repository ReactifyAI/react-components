import { useState, useEffect, useCallback } from 'react'
import { useFAQs } from '../hooks/useFAQs'
import { FAQLoading } from './FAQLoading'
import { FAQError} from './FAQError'
import { FAQContent } from './FAQContent'

export function FAQList() {
  const { faqs, loading, error } = useFAQs()
  const [openId, setOpenId] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (faqs.length > 0 && openId === null) {
      setOpenId(faqs[0].id)
    }
  }, [faqs])

  const handleToggle = useCallback((id: number) => {
    setOpenId(prev => prev === id ? null : id)
  }, [])

  // Filter FAQs based on search
  const filteredFAQs = faqs.filter((faq) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    )
  })

  if (loading) return <FAQLoading />
  if (error) return <FAQError message={error} />

  return (
    <FAQContent
      faqs={filteredFAQs}
      openId={openId}
      searchQuery={searchQuery}
      onToggle={handleToggle}
      onSearchChange={setSearchQuery}
      onSearchClear={() => setSearchQuery('')}
    />
  )
}
