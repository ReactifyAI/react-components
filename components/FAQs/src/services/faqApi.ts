import { type FAQ } from '../types/faq'

const API_URL = 'http://localhost:3001/api/faqs'

export const faqApi = {
  fetchFAQs: async (): Promise<FAQ[]> => {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error('Failed to fetch FAQs')
    }

    const data = await response.json()

    return data.map((item: any) => ({
      id: item.id,
      question: item.question,
      answer: item.answer
    }))
  }
}