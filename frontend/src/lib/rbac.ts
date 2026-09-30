import type { Role } from '@/types'

/** Konfigurasi hak akses berbasis peran — mudah dipetakan ke permission backend. */
export interface NavItem {
  label: string
  path: string
  roles: Role[]
}

const PEPEMIMPIN: Role[] = ['dekan', 'wd1', 'wd2', 'wd3']
const AKADEMIK: Role[] = ['admin', ...PEPEMIMPIN, 'kaprodi', 'dosen', 'staff']

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', path: '/', roles: ['admin', ...PEPEMIMPIN, 'kaprodi', 'dosen', 'staff'] },
  { label: 'Mahasiswa', path: '/mahasiswa', roles: AKADEMIK },
  { label: 'Dosen & Tenaga Kependidikan', path: '/dosen', roles: AKADEMIK },
  { label: 'Mata Kuliah', path: '/mata-kuliah', roles: AKADEMIK },
  { label: 'Jurusan', path: '/jurusan', roles: AKADEMIK },
  { label: 'Pengumuman', path: '/pengumuman', roles: ['admin', ...PEPEMIMPIN, 'kaprodi', 'dosen', 'staff'] },
  { label: 'Manajemen Pengguna', path: '/pengguna', roles: ['admin'] },
]

export function canAccess(role: Role | undefined, allowed: Role[]) {
  return !!role && allowed.includes(role)
}
