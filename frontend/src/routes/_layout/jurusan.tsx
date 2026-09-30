import { useQuery } from '@tanstack/react-query'
import { createRoute } from '@tanstack/react-router'
import { Users2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { queryKeys } from '@/hooks/query-keys'
import { jurusanService, userService } from '@/services'
import { layoutRoute } from '../_layout'

function JurusanPage() {
  const jurusan = useQuery({ queryKey: queryKeys.jurusan.list, queryFn: jurusanService.list })
  const users = useQuery({ queryKey: queryKeys.users.list, queryFn: userService.list })

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {jurusan.data?.map((j) => {
        const kaprodi = users.data?.find((u) => u.id === j.kaprodiId)
        return (
          <Card key={j.id} className="transition-shadow hover:shadow-md">
            <CardContent className="space-y-3 p-5">
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-xl bg-uho-navy text-sm font-bold text-white">
                  {j.kode}
                </div>
                <Badge tone="gold">{j.jumlahProdi} Prodi</Badge>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{j.nama}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                  <Users2 className="size-3.5" />
                  Ketua: {kaprodi?.nama ?? '—'}
                </p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export const jurusanRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/jurusan',
  component: JurusanPage,
})
