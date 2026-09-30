/**
 * Klien HTTP tipis. Saat backend siap, cukup ubah USE_MOCK ke false
 * dan pastikan VITE_API_URL menunjuk ke server API.
 */

export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) throw new ApiError(res.status, `Request gagal: ${res.status}`)
  return res.json() as Promise<T>
}

export const http = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}

/** Simulasi latensi jaringan agar UX loading state terlihat saat dev. */
export function delay(ms = 350) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
