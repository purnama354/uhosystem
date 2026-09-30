/**
 * Tipe domain Sistem Informasi Fakultas Teknik UHO.
 * Semua tipe di sini mencerminkan kontrak data yang nantinya
 * dikembalikan oleh backend (REST/GraphQL).
 */

export type Role =
  | 'admin'
  | 'dekan'
  | 'wd1' // Wakil Dekan I (Akademik)
  | 'wd2' // Wakil Dekan II (Umum & Keuangan)
  | 'wd3' // Wakil Dekan III (Kemahasiswaan & Alumni)
  | 'kaprodi' // Ketua Jurusan/Program Studi
  | 'dosen'
  | 'staff'

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administrator',
  dekan: 'Dekan',
  wd1: 'Wakil Dekan I (Akademik)',
  wd2: 'Wakil Dekan II (Umum & Keuangan)',
  wd3: 'Wakil Dekan III (Kemahasiswaan)',
  kaprodi: 'Ketua Program Studi',
  dosen: 'Dosen',
  staff: 'Staf Tata Usaha',
}

export interface User {
  id: string
  nama: string
  nip: string | null
  email: string
  role: Role
  jabatan: string
  jurusanId?: string
  fotoUrl?: string
}

export interface Jurusan {
  id: string
  kode: string
  nama: string
  singkatan: string
  kaprodiId: string
  jumlahProdi: number
}

export interface Mahasiswa {
  id: string
  nim: string
  nama: string
  angkatan: number
  semester: number
  status: 'aktif' | 'cuti' | 'lulus' | 'drop'
  jurusanId: string
  ipk: number
  sks: number
}

export interface Dosen {
  id: string
  nip: string
  nama: string
  gelar: string
  jabatanFungsional: 'Asisten Ahli' | 'Lektor' | 'Lektor Kepala' | 'Guru Besar'
  jurusanId: string
  email: string
}

export interface MataKuliah {
  id: string
  kode: string
  nama: string
  sks: number
  semester: number
  jurusanId: string
  dosenId: string
}

export interface Pengumuman {
  id: string
  judul: string
  isi: string
  kategori: 'akademik' | 'keuangan' | 'kemahasiswaan' | 'umum'
  tanggal: string // ISO
  penulis: string
}

export interface StatistikFakultas {
  totalMahasiswa: number
  totalDosen: number
  totalMataKuliah: number
  rataIpk: number
  mahasiswaPerJurusan: Array<{ jurusan: string; jumlah: number }>
  distribusiStatus: Array<{ status: string; jumlah: number }>
}
