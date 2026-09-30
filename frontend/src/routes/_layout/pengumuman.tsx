import { useQuery } from '@tanstack/react-query'
import { createRoute } from '@tanstack/react-router'
import { Megaphone } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { queryKeys } from '@/hooks/query-keys'
import { pengumumanService } from '@/services'
import { formatTanggal } from '@/lib/utils'
import { layoutRoute } from '../_layout'

const TONE = {
  akademik: 'blue',
  keuangan: 'amber',
  kemahasiswaan: 'green',
  umum: 'slate',
} as const

function PengumumanPage() {
  const daftar = useQuery({
    queryKey: queryKeys.pengumuman.list,
    queryFn: pengumumanService.list,
  })

  return (
    <div className="space-y-4">
      {daftar.data?.map((p) => (
        <Card key={p.id}>
          <CardContent className="flex gap-4 p-5">
            <div className="hidden size-10 shrink-0 items-center justify-center rounded-xl bg-uho-blue/10 text-uho-blue sm:flex">
              <Megaphone className="size-5" />
            </div>
            <div className="min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={TONE[p.kategori]}>{p.kategori}</Badge>
                <span className="text-xs text-slate-400">{formatTanggal(p.tanggal)}</span>
              </div>
              <h3 className="font-semibold text-slate-800">{p.judul}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{p.isi}</p>
              <p className="text-xs text-slate-400">Diterbitkan oleh {p.penulis}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export const pengumumanRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/pengumuman',
  component: PengumumanPage,
})
