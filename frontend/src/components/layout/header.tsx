import { useLocation } from '@tanstack/react-router'
import { Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ROLE_LABELS } from '@/types'
import { useAuth } from '@/hooks/use-auth'

const TITLES: Record<string, string> = {
  '/': 'Dashboard Fakultas',
  '/mahasiswa': 'Data Mahasiswa',
  '/dosen': 'Data Dosen & Tenaga Kependidikan',
  '/mata-kuliah': 'Data Mata Kuliah',
  '/jurusan': 'Jurusan / Program Studi',
  '/pengumuman': 'Pengumuman Fakultas',
  '/pengguna': 'Manajemen Pengguna',
}

export function Header() {
  const { user } = useAuth()
  const { pathname } = useLocation()

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-5 lg:px-8">
        <div>
          <h1 className="text-base font-bold text-uho-navy">
            {TITLES[pathname] ?? 'Sistem Informasi Fakultas'}
          </h1>
          <p className="hidden text-xs text-slate-500 sm:block">
            Universitas Halu Oleo — Fakultas Teknik
          </p>
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <Badge tone="gold" className="hidden sm:inline-flex">
              {ROLE_LABELS[user.role]}
            </Badge>
          )}
          <button className="relative rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-uho-navy">
            <Bell className="size-5" />
            <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-uho-gold" />
          </button>
        </div>
      </div>
    </header>
  )
}
