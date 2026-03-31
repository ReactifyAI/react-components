import { type User } from "../types//index";

const MOCK_USERS: Record<number, User> = {
  1: { id: 1, name: 'Shraddha', email: 'xyz@gmail.com', company: 'ABC' },
  2: { id: 2, name: 'Sam', email: 'sam19@gmail.com', company: 'PTC' }
}

// This fetch is with mock data, it is not an actual API call.
export async function fetchUser(userId: number, signal: AbortSignal): Promise<User> {
  const delay = Math.random() * 700 + 800;

  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(resolve, delay)

    signal.addEventListener("abort", () => {
      clearTimeout(timer)
      reject(new DOMException("Request aborted", "AbortError"))
    })
  })

  // Simulate occasional server errors
  if (Math.random() < 0.2) {
    throw new Error("503 Service Unavailable")
  }

  const user = MOCK_USERS[userId]

  if (!user) throw new Error(`User ${userId} not found`)

  return user
}