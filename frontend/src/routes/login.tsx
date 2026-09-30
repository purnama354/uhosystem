import { useMutation } from '@tanstack/react-query'
import { Navigate, createRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'
import { GraduationCap, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useAuth } from '@/hooks/use-auth'
import { rootRoute } from './__root'
import { mockUsers } from '@/mocks/data'
import { authService } from '@/services'
import { ROLE_LABELS } from '@/types'

function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const { redirect } = useSearch({ from: '/login' })
  const [email, setEmail] = useState('dekan@uho.ac.id')

  const mutation = useMutation({
    mutationFn: (em: string) => authService.login(em),
    onSuccess: (u) => {
      login(u)
      navigate({ to: redirect ?? '/' })
    },
  })

  if (user) return <Navigate to="/" />

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    mutation.mutate(email)
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Panel identitas */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-uho-navy p-12 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, #3b82c4 0, transparent 45%), radial-gradient(circle at 80% 80%, #d4a017 0, transparent 40%)',
          }}
        />
        <div className="relative flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
            <GraduationCap className="size-6" />
          </div>
          <div>
            <p className="font-bold tracking-wide">SIMFAKTEK</p>
            <p className="text-xs text-white/60">Universitas Halu Oleo</p>
          </div>
        </div>
        <div className="relative space-y-3">
          <h2 className="text-3xl font-bold leading-tight">
            Sistem Informasi
            <br />
            Fakultas Teknik
          </h2>
          <p className="max-w-sm text-sm text-white/70">
            Satu portal untuk tata kelola akademik, kepegawaian, dan kemahasiswaan —
            Dekan, Wakil Dekan, Ketua Jurusan, Dosen, Staf, dan Administrator.
          </p>
        </div>
        <p className="relative text-xs text-white/40">
          © 2026 Fakultas Teknik — Universitas Halu Oleo, Kendari
        </p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-lg text-uho-navy">Masuk ke Portal</CardTitle>
            <p className="text-xs text-slate-500">
              Pilih akun demo untuk mencoba tampilan per peran.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600">
                  Masuk sebagai
                </label>
                <Select
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                >
                  {mockUsers.map((u) => (
                    <option key={u.id} value={u.email}>
                      {ROLE_LABELS[u.role]} — {u.nama}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600">Email</label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@uho.ac.id"
                />
              </div>
              <Button type="submit" className="w-full" disabled={mutation.isPending}>
                {mutation.isPending && <Loader2 className="size-4 animate-spin" />}
                Masuk
              </Button>
              {mutation.isError && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                  {(mutation.error as Error).message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
})
