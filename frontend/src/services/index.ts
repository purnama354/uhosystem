/**
 * Service layer — satu-satunya tempat yang tahu apakah data
 * berasal dari mock atau dari backend asli. Komponen & hook
 * hanya berbicara terhadap antarmuka ini, sehingga integrasi
 * backend nantinya tidak mengubah kode UI sama sekali.
 */

import {
  mockDosenList,
  mockJurusan,
  mockMahasiswa,
  mockMataKuliah,
  mockPengumuman,
  mockUsers,
} from '@/mocks/data'
import type {
  Dosen,
  Jurusan,
  Mahasiswa,
  MataKuliah,
  Pengumuman,
  StatistikFakultas,
  User,
} from '@/types'
import { USE_MOCK, delay, http } from './api-client'

export interface ListParams {
  search?: string
  jurusanId?: string
  halaman?: number
  perHalaman?: number
}

function paginate<T>(items: T[], params?: ListParams) {
  const perHalaman = params?.perHalaman ?? 10
  const halaman = params?.halaman ?? 1
  const total = items.length
  return {
    data: items.slice((halaman - 1) * perHalaman, halaman * perHalaman),
    total,
    halaman,
    totalHalaman: Math.max(1, Math.ceil(total / perHalaman)),
  }
}

export interface Paged<T> {
  data: T[]
  total: number
  halaman: number
  totalHalaman: number
}

const bySearch = (q?: string, fields: string[] = []) => (x: Record<string, unknown>) =>
  !q ||
  fields.some((f) => String(x[f] ?? '').toLowerCase().includes(q.toLowerCase()))

export const authService = {
  async login(email: string): Promise<User> {
    if (!USE_MOCK) return http.post<User>('/auth/login', { email })
    await delay()
    const user = mockUsers.find((u) => u.email === email)
    if (!user) throw new Error('Email tidak terdaftar pada akun demo.')
    return user
  },
  async me(): Promise<User | null> {
    if (!USE_MOCK) return http.get<User>('/auth/me')
    await delay(100)
    const raw = localStorage.getItem('simfak.session')
    return raw ? (JSON.parse(raw) as User) : null
  },
}

export const jurusanService = {
  async list(): Promise<Jurusan[]> {
    if (!USE_MOCK) return http.get<Jurusan[]>('/jurusan')
    await delay()
    return mockJurusan
  },
}

export const mahasiswaService = {
  async list(params?: ListParams): Promise<Paged<Mahasiswa>> {
    if (!USE_MOCK) return http.get<Paged<Mahasiswa>>(`/mahasiswa?${new URLSearchParams(params as never)}`)
    await delay()
    const filtered = mockMahasiswa.filter(
      bySearch(params?.search, ['nim', 'nama']) as never,
    ).filter((m) => !params?.jurusanId || m.jurusanId === params.jurusanId)
    return paginate(filtered, params)
  },
}

export const dosenService = {
  async list(params?: ListParams): Promise<Paged<Dosen>> {
    if (!USE_MOCK) return http.get<Paged<Dosen>>('/dosen')
    await delay()
    const filtered = mockDosenList.filter(
      bySearch(params?.search, ['nip', 'nama', 'gelar']) as never,
    ).filter((d) => !params?.jurusanId || d.jurusanId === params.jurusanId)
    return paginate(filtered, params)
  },
}

export const mataKuliahService = {
  async list(params?: ListParams): Promise<Paged<MataKuliah>> {
    if (!USE_MOCK) return http.get<Paged<MataKuliah>>('/mata-kuliah')
    await delay()
    const filtered = mockMataKuliah.filter(
      bySearch(params?.search, ['kode', 'nama']) as never,
    ).filter((m) => !params?.jurusanId || m.jurusanId === params.jurusanId)
    return paginate(filtered, params)
  },
}

export const pengumumanService = {
  async list(): Promise<Pengumuman[]> {
    if (!USE_MOCK) return http.get<Pengumuman[]>('/pengumuman')
    await delay()
    return [...mockPengumuman].sort(
      (a, b) => new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime(),
    )
  },
}

export const statistikService = {
  async fakultas(): Promise<StatistikFakultas> {
    if (!USE_MOCK) return http.get<StatistikFakultas>('/statistik/fakultas')
    await delay()
    const perJurusan = mockJurusan.map((j) => ({
      jurusan: j.singkatan,
      jumlah: mockMahasiswa.filter((m) => m.jurusanId === j.id).length,
    }))
    const statuses: Mahasiswa['status'][] = ['aktif', 'cuti', 'lulus', 'drop']
    return {
      totalMahasiswa: mockMahasiswa.length,
      totalDosen: mockDosenList.length,
      totalMataKuliah: mockMataKuliah.length,
      rataIpk: Number(
        (
          mockMahasiswa.reduce((a, m) => a + m.ipk, 0) / mockMahasiswa.length
        ).toFixed(2),
      ),
      mahasiswaPerJurusan: perJurusan,
      distribusiStatus: statuses.map((s) => ({
        status: s,
        jumlah: mockMahasiswa.filter((m) => m.status === s).length,
      })),
    }
  },
}

export const userService = {
  async list(): Promise<User[]> {
    if (!USE_MOCK) return http.get<User[]>('/users')
    await delay()
    return mockUsers
  },
}
