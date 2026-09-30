import { useQuery } from '@tanstack/react-query'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { authService } from '@/services'
import type { Role, User } from '@/types'
import { queryKeys } from './query-keys'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  hasRole: (...roles: Role[]) => boolean
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessionUser, setSessionUser] = useState<User | null>(() => {
    const raw = localStorage.getItem('simfak.session')
    return raw ? (JSON.parse(raw) as User) : null
  })

  // Di produksi, ganti inisial state ini dengan hasil query /auth/me.
  useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: authService.me,
    enabled: false,
  })

  const login = useCallback((user: User) => {
    localStorage.setItem('simfak.session', JSON.stringify(user))
    setSessionUser(user)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('simfak.session')
    setSessionUser(null)
  }, [])

  const hasRole = useCallback(
    (...roles: Role[]) => !!sessionUser && roles.includes(sessionUser.role),
    [sessionUser],
  )

  const value = useMemo(
    () => ({ user: sessionUser, isLoading: false, login, logout, hasRole }),
    [sessionUser, login, logout, hasRole],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider')
  return ctx
}
