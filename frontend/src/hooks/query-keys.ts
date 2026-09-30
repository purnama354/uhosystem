/**
 * Centralized TanStack Query keys — mencegah typo dan memudahkan
 * invalidasi cache saat backend menambahkan mutasi (CRUD).
 */
export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  jurusan: {
    list: ['jurusan', 'list'] as const,
  },
  mahasiswa: {
    list: (params?: unknown) => ['mahasiswa', 'list', params] as const,
  },
  dosen: {
    list: (params?: unknown) => ['dosen', 'list', params] as const,
  },
  mataKuliah: {
    list: (params?: unknown) => ['mata-kuliah', 'list', params] as const,
  },
  pengumuman: {
    list: ['pengumuman', 'list'] as const,
  },
  statistik: {
    fakultas: ['statistik', 'fakultas'] as const,
  },
  users: {
    list: ['users', 'list'] as const,
  },
}
