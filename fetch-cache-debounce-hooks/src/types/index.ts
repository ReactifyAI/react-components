export interface CacheEntry<T> {
  data: T;
  cachedAt: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  company: string;
}

export interface UseFetchOptions {
  cacheTTL?: number;
  enabled?: boolean;
}

export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export interface UseFetchReturn<T> extends FetchState<T> {
  refetch: () => void
}
