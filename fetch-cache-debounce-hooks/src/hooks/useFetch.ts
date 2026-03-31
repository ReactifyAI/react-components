import { useState, useRef, useCallback, useEffect } from "react"
import { type UseFetchOptions, type UseFetchReturn, type FetchState } from "../types/index";
import { getCache, setCache, isFresh } from "../mocks/mockCache";

const DEFAULT_CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

export function useFetch<T>(
  url: string,
  fetcher: (signal: AbortSignal) => Promise<T>,
  options?: UseFetchOptions
): UseFetchReturn<T> {
  const { cacheTTL = DEFAULT_CACHE_TTL_MS, enabled = true } = options ?? {}

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null
  })

  const abortRef = useRef<AbortController | null>(null)

  const fetchData = useCallback(async () => {
    if (!enabled || !url) return;

    // Serve from the cache if still fresh
    const cached = getCache<T>(url)
    if (cached && isFresh(cached, cacheTTL)) {
      setState({ data: cached.data, loading: false, error: null })
      console.log('******* GET FROM CACHE ')
      return;
    }

    abortRef.current?.abort()
    abortRef.current = new AbortController()

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const data = await fetcher(abortRef.current.signal)

      setCache<T>(url, data)

      setState({ data, loading: false, error: null})

    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;

      setState({
        data: null,
        loading: false,
        error: err instanceof Error ? err.message : "Something went wrong"
      })
    }

  }, [url, fetcher, enabled, cacheTTL])

  useEffect(() => {
    fetchData();

    return () => {
      abortRef.current?.abort();
    }
  }, [fetchData])

  return { ...state, refetch: fetchData };

}