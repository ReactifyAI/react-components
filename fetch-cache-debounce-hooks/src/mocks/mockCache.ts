import { type CacheEntry } from "../types/index";

const cache = new Map<string, CacheEntry<unknown>>()

export function getCache<T>(key: string): CacheEntry<T> | undefined {
  return cache.get(key) as CacheEntry<T> | undefined
}

export function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, cachedAt: Date.now() })
}

export function deleteCache(key: string): void {
  cache.delete(key)
}

export function clearCache(): void {
  cache.clear()
}

export function isFresh(entry: CacheEntry<unknown>, ttlMs: number): boolean {
  return Date.now() - entry.cachedAt < ttlMs
}