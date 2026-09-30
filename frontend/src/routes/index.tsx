import { useQuery } from '@tanstack/react-query'
import { createRoute } from '@tanstack/react-router'
import { BookOpen, GaugeCircle, UserSquare2, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { queryKeys } from '@/hooks/query-keys'
import { useAuth } from '@/hooks/use-auth'
import { pengumumanService, statistikService } from '@/services'
import { formatTanggal } from '@/lib/utils'
import { layoutRoute } from './_layout'

const KATEGORI_TONE = {
  akademik: 'blue',
  keuangan: 'amber',
  kemahasiswaan: 'green',
  umum: 'slate',
} as const

function DashboardPage() {
  const { user } = useAuth()
  const statistik = useQuery({
    queryKey: queryKeys.statistik.fakultas,
    queryFn: statistikService.fakultas,
  })
  const pengumuman = useQuery({
    queryKey: queryKeys.pengumuman.list,
    queryFn: pengumumanService.list,
  })

  const cards = [
    { label: 'Total Mahasiswa', value: statistik.data?.totalMahasiswa, icon: Users, tone: 'bg-uho-navy' },
    { label: 'Dosen', value: statistik.data?.totalDosen, icon: UserSquare2, tone: 'bg-uho-blue' },
    { label: 'Mata Kuliah', value: statistik.data?.totalMataKuliah, icon: BookOpen, tone: 'bg-uho-sky' },
    { label: 'Rata-rata IPK', value: statistik.data?.rataIpk, icon: GaugeCircle, tone: 'bg-uho-gold' },
  ]

  const maxJumlah = Math.max(
    ...(statistik.data?.mahasiswaPerJurusan.map((j) => j.jumlah) ?? [1]),
  )

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-0 bg-gradient-to-r from-uho-navy to-uho-blue text-white">
        <CardContent className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-white/70">
              {new Date().toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <h2 className="mt-1 text-xl font-bold">Selamat datang, {user?.nama}</h2>
            <p className="mt-1 text-sm text-white/70">{user?.jabatan}</p>
          </div>
          <Badge className="w-fit bg-white/15 text-yellow-300 ring-1 ring-white/20">
            Mode Demo — Data Mock
          </Badge>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${c.tone} text-white`}
              >
                <c.icon className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {statistik.isLoading ? '…' : c.value}
                </p>
                <p className="text-xs text-slate-500">{c.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Distribusi Mahasiswa per Jurusan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {statistik.data?.mahasiswaPerJurusan.map((j) => (
              <div key={j.jurusan} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-600">Teknik {j.jurusan}</span>
                  <span className="text-slate-400">{j.jumlah} mhs</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-uho-blue to-uho-sky transition-all"
                    style={{ width: `${(j.jumlah / maxJumlah) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pengumuman Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pengumuman.data?.slice(0, 4).map((p) => (
              <div key={p.id} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <div className="mb-1 flex items-center gap-2">
                  <Badge tone={KATEGORI_TONE[p.kategori]}>{p.kategori}</Badge>
                  <span className="text-[11px] text-slate-400">{formatTanggal(p.tanggal)}</span>
                </div>
                <p className="text-sm font-medium leading-snug text-slate-800">{p.judul}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export const dashboardRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: DashboardPage,
})
