import { useCallback } from 'react'
import { type User } from '../types/index'
import { fetchUser } from '../mocks/mockApi'
import { useFetch } from '../hooks/useFetch'


export default function UserProfile({ userId }: { userId: number}) {
  const fetcher = useCallback((signal: AbortSignal) => fetchUser(userId, signal), [userId])

  const { data, loading, error, refetch } = useFetch<User>(
    `/api/user/${userId}`,
    fetcher,
    {
      enabled: !!userId,
      cacheTTL: 2 * 60 * 1000 // 2 minutes
    }
  )

  if (loading) return <p>Loading.....</p>
  if (error) return <p>Error: {error} <button onClick={refetch}>Retry</button></p>
  if (!data) return null

  return (
    <>
      <h2>{data.name}</h2>
      <p>{data.email}</p>
      <p>{data.company}</p>
    </>
  )
}