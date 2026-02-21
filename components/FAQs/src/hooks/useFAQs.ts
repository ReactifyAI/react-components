import { useState, useEffect } from 'react'
import { type FAQ } from '../types/faq'
import { faqApi } from '../services/faqApi'

export function useFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        setLoading(true)
        const data = await faqApi.fetchFAQs()
        setFaqs(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load FAQs')
      } finally {
        setLoading(false)
      }
    }

    loadFAQs()
  }, [])

  return { faqs, loading, error }
}
