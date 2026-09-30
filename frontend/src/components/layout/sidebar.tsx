import { Link, useLocation } from '@tanstack/react-router'
import { Building2, LogOut } from 'lucide-react'
import { NAV_ITEMS, canAccess } from '@/lib/rbac'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { ROLE_LABELS } from '@/types'

export function Sidebar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  const items = NAV_ITEMS.filter((item) => canAccess(user?.role, item.roles))

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex size-10 items-center justify-center rounded-xl bg-uho-navy text-white shadow-md">
          <Building2 className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold text-uho-navy">SIMFAKTEK</p>
          <p className="text-[11px] text-slate-500">Fakultas Teknik UHO</p>
        </div>
      </div>

      {/* Navigasi */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {items.map((item) => {
          const active = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'block rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-uho-navy text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Pengguna */}
      <div className="border-t border-slate-100 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-full bg-uho-blue/10 text-sm font-semibold text-uho-blue">
            {user?.nama.charAt(0)}
          </div>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-medium text-slate-800">{user?.nama}</p>
            <p className="truncate text-xs text-slate-500">
              {user ? ROLE_LABELS[user.role] : ''}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="size-3.5" /> Keluar
        </button>
      </div>
    </aside>
  )
}
