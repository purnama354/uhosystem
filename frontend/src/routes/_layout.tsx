import { Outlet, createRoute, redirect } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { readSession } from '@/hooks/use-auth'
import { rootRoute } from './__root'

export function LayoutPage() {
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
  // Guard dijalankan SEBELUM komponen dirender: jika tidak ada sesi,
  // pengguna langsung dialihkan ke /login (dengan parameter ?redirect).
  beforeLoad: ({ location }) => {
    if (!readSession()) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      })
    }
  },
})
