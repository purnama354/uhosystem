import type {
  Dosen,
  Jurusan,
  Mahasiswa,
  MataKuliah,
  Pengumuman,
  User,
} from '@/types'

/**
 * Mock data — pengganti respons API.
 * Saat backend siap, data ini dipindahkan ke server dan service
 * tinggal memanggil endpoint aslinya (lihat src/services/api.ts).
 */

export const mockUsers: User[] = [
  { id: 'u-1', nama: 'Andi Pratama', nip: null, email: 'admin@uho.ac.id', role: 'admin', jabatan: 'Administrator Sistem' },
  { id: 'u-2', nama: 'Prof. Dr. Ir. Muhammad Zardamine, M.T.', nip: '196501011990031004', email: 'dekan@uho.ac.id', role: 'dekan', jabatan: 'Dekan Fakultas Teknik' },
  { id: 'u-3', nama: 'Dr. Ir. Nursina Hasan, M.T.', nip: '197002101998022001', email: 'wd1@uho.ac.id', role: 'wd1', jabatan: 'Wakil Dekan I' },
  { id: 'u-4', nama: 'Dr. Sahrul, S.E., M.M.', nip: '197505152001121002', email: 'wd2@uho.ac.id', role: 'wd2', jabatan: 'Wakil Dekan II' },
  { id: 'u-5', nama: 'Dr. La Ode Asrudin, S.Pd., M.Hum.', nip: '198001202005011003', email: 'wd3@uho.ac.id', role: 'wd3', jabatan: 'Wakil Dekan III' },
  { id: 'u-6', nama: 'Ir. Ali Demati, M.T.', nip: '197211101999031005', email: 'kaprodi.informatika@uho.ac.id', role: 'kaprodi', jabatan: 'Ketua Jurusan Teknik Informatika', jurusanId: 'j-1' },
  { id: 'u-7', nama: 'Dr. Ing. Waode Erita, S.T., M.T.', nip: '198203052008122006', email: 'kaprodi.sipil@uho.ac.id', role: 'kaprodi', jabatan: 'Ketua Jurusan Teknik Sipil', jurusanId: 'j-2' },
  { id: 'u-8', nama: 'Hasnawati, S.T., M.T.', nip: '198609122012122007', email: 'dosen1@uho.ac.id', role: 'dosen', jabatan: 'Dosen', jurusanId: 'j-1' },
  { id: 'u-9', nama: 'Laode Hadi, S.Kom., M.Cs.', nip: '198804202014041008', email: 'dosen2@uho.ac.id', role: 'dosen', jabatan: 'Dosen', jurusanId: 'j-1' },
  { id: 'u-10', nama: 'Nur Aida', nip: null, email: 'staff.keu@uho.ac.id', role: 'staff', jabatan: 'Staf Bagian Keuangan' },
]

export const mockJurusan: Jurusan[] = [
  { id: 'j-1', kode: 'TI', nama: 'Teknik Informatika', singkatan: 'Informatika', kaprodiId: 'u-6', jumlahProdi: 2 },
  { id: 'j-2', kode: 'TS', nama: 'Teknik Sipil', singkatan: 'Sipil', kaprodiId: 'u-7', jumlahProdi: 2 },
  { id: 'j-3', kode: 'TE', nama: 'Teknik Elektro', singkatan: 'Elektro', kaprodiId: 'u-7', jumlahProdi: 3 },
  { id: 'j-4', kode: 'TP', nama: 'Teknik Mesin', singkatan: 'Mesin', kaprodiId: 'u-6', jumlahProdi: 1 },
  { id: 'j-5', kode: 'TPI', nama: 'Teknik Industri', singkatan: 'Industri', kaprodiId: 'u-7', jumlahProdi: 1 },
  { id: 'j-6', kode: 'TL', nama: 'Teknik Lingkungan', singkatan: 'Lingkungan', kaprodiId: 'u-6', jumlahProdi: 1 },
]

const namaDepan = ['Andi', 'Budi', 'Citra', 'Dewi', 'Eka', 'Fitri', 'Gita', 'Hendra', 'Intan', 'Joko', 'Kartika', 'La Ode', 'Maria', 'Nabila', 'Oscar', 'Putri', 'Rizky', 'Sari', 'Taufik', 'Umar']
const namaBelakang = ['Saputra', 'Maulana', 'Ramadhan', 'Iskandar', 'Alfarizi', 'Hidayat', 'Pratama', 'Ningsih', 'Lestari', 'Fadilah']

export const mockMahasiswa: Mahasiswa[] = Array.from({ length: 60 }, (_, i) => {
  const angkatan = 2020 + (i % 5)
  const statusPool: Mahasiswa['status'][] = ['aktif', 'aktif', 'aktif', 'aktif', 'cuti', 'lulus']
  return {
    id: `m-${i + 1}`,
    nim: `${angkatan}${String(i + 1).padStart(4, '0')}`,
    nama: `${namaDepan[i % namaDepan.length]} ${namaBelakang[i % namaBelakang.length]}`,
    angkatan,
    semester: Math.min(2 + (i % 9), 12),
    status: statusPool[i % statusPool.length],
    jurusanId: mockJurusan[i % mockJurusan.length].id,
    ipk: Number((2.8 + ((i * 13) % 140) / 100).toFixed(2)),
    sks: 60 + (i % 80),
  }
})

export const mockDosenList: Dosen[] = [
  { id: 'd-1', nip: '198609122012122007', nama: 'Hasnawati', gelar: 'S.T., M.T.', jabatanFungsional: 'Lektor', jurusanId: 'j-1', email: 'hasnawati@uho.ac.id' },
  { id: 'd-2', nip: '198804202014041008', nama: 'Laode Hadi', gelar: 'S.Kom., M.Cs.', jabatanFungsional: 'Asisten Ahli', jurusanId: 'j-1', email: 'laodehadi@uho.ac.id' },
  { id: 'd-3', nip: '197907152005011009', nama: 'Burhanuddin', gelar: 'M.T.', jabatanFungsional: 'Lektor Kepala', jurusanId: 'j-2', email: 'burhan@uho.ac.id' },
  { id: 'd-4', nip: '198311222009121010', nama: 'Waode Salma', gelar: 'S.T., M.Eng.', jabatanFungsional: 'Lektor', jurusanId: 'j-3', email: 'salma@uho.ac.id' },
  { id: 'd-5', nip: '197501101999031011', nama: 'Abdul Rahman', gelar: 'M.Sc., Ph.D.', jabatanFungsional: 'Guru Besar', jurusanId: 'j-4', email: 'abdulrahman@uho.ac.id' },
  { id: 'd-6', nip: '199001052015042012', nama: 'Nurul Fajriah', gelar: 'S.T., M.T.', jabatanFungsional: 'Asisten Ahli', jurusanId: 'j-5', email: 'fajriah@uho.ac.id' },
]

export const mockMataKuliah: MataKuliah[] = [
  { id: 'mk-1', kode: 'TI2101', nama: 'Struktur Data & Algoritma', sks: 3, semester: 3, jurusanId: 'j-1', dosenId: 'd-1' },
  { id: 'mk-2', kode: 'TI3102', nama: 'Basis Data', sks: 3, semester: 5, jurusanId: 'j-1', dosenId: 'd-2' },
  { id: 'mk-3', kode: 'TI4103', nama: 'Rekayasa Perangkat Lunak', sks: 3, semester: 7, jurusanId: 'j-1', dosenId: 'd-1' },
  { id: 'mk-4', kode: 'TS2201', nama: 'Mekanika Struktur', sks: 3, semester: 3, jurusanId: 'j-2', dosenId: 'd-3' },
  { id: 'mk-5', kode: 'TE3301', nama: 'Sistem Kendali', sks: 3, semester: 5, jurusanId: 'j-3', dosenId: 'd-4' },
  { id: 'mk-6', kode: 'TM4401', nama: 'Termodinamika', sks: 3, semester: 7, jurusanId: 'j-4', dosenId: 'd-5' },
  { id: 'mk-7', kode: 'TI5104', nama: 'Kecerdasan Buatan', sks: 3, semester: 9, jurusanId: 'j-1', dosenId: 'd-2' },
  { id: 'mk-8', kode: 'TL2601', nama: 'Kimia Lingkungan', sks: 2, semester: 3, jurusanId: 'j-6', dosenId: 'd-6' },
]

export const mockPengumuman: Pengumuman[] = [
  { id: 'p-1', judul: 'Pembukaan KRS Semester Ganjil 2026/2027', isi: 'Sistem KRS dibuka mulai 1 Agustus 2026 pukul 08.00 WITA. Pastikan pembayaran UKT telah diverifikasi oleh bagian keuangan.', kategori: 'akademik', tanggal: '2026-07-25T08:00:00+08:00', penulis: 'Wakil Dekan I' },
  { id: 'p-2', judul: 'Jadwal Ujian Akhir Semester Genap', isi: 'UAS dilaksanakan 8–19 Juni 2026. Jadwal per ruangan dapat diunduh pada menu akademik.', kategori: 'akademik', tanggal: '2026-05-30T08:00:00+08:00', penulis: 'Bagian Akademik' },
  { id: 'p-3', judul: 'Bebaskan UKT: Info Beasiswa PPA & Bank NTT', isi: 'Pendaftaran beasiswa dibuka hingga 15 Agustus 2026. Persyaratan lengkap tersedia di bagian kemahasiswaan.', kategori: 'kemahasiswaan', tanggal: '2026-07-20T08:00:00+08:00', penulis: 'Wakil Dekan III' },
  { id: 'p-4', judul: 'Rekrutmen Tenaga Kependidikan Kontrak', isi: 'Fakultas Teknik membuka 5 formasi tenaga kontrak untuk laboratorium komputer dan tata usaha.', kategori: 'umum', tanggal: '2026-07-15T08:00:00+08:00', penulis: 'Wakil Dekan II' },
  { id: 'p-5', judul: 'Sosialisasi Akreditasi Unggul Prodi Informatika', isi: 'Visitasi daring borang akreditasi dijadwalkan minggu depan. Seluruh dosen diharapkan menyiapkan dokumen bukti.', kategori: 'akademik', tanggal: '2026-07-10T08:00:00+08:00', penulis: 'Tim Task Force' },
]
