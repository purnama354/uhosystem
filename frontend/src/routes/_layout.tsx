import { Outlet, createRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { useAuth } from '@/hooks/use-auth'
import { rootRoute } from './__root'

export function LayoutPage() {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        Mengalihkan ke halaman masuk…
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: '_layout',
  component: LayoutPage,
})
