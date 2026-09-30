import { useQuery } from '@tanstack/react-query'
import { createRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { DataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { queryKeys } from '@/hooks/query-keys'
import { dosenService, jurusanService, mataKuliahService } from '@/services'
import type { MataKuliah } from '@/types'
import { layoutRoute } from '../_layout'

function MataKuliahPage() {
  const [search, setSearch] = useState('')
  const [halaman, setHalaman] = useState(1)

  const jurusan = useQuery({ queryKey: queryKeys.jurusan.list, queryFn: jurusanService.list })
  const dosen = useQuery({ queryKey: queryKeys.dosen.list(), queryFn: () => dosenService.list({ perHalaman: 100 }) })
  const daftar = useQuery({
    queryKey: queryKeys.mataKuliah.list({ search, halaman }),
    queryFn: () => mataKuliahService.list({ search, halaman, perHalaman: 8 }),
  })

  const columns: ColumnDef<MataKuliah>[] = [
    { accessorKey: 'kode', header: 'Kode MK' },
    {
      accessorKey: 'nama',
      header: 'Mata Kuliah',
      cell: ({ row }) => (
        <span className="font-medium text-slate-800">{row.original.nama}</span>
      ),
    },
    {
      accessorKey: 'sks',
      header: 'SKS',
      cell: ({ getValue }) => <Badge tone="blue">{getValue<number>()} SKS</Badge>,
    },
    { accessorKey: 'semester', header: 'Semester' },
    {
      accessorKey: 'jurusanId',
      header: 'Jurusan',
      cell: ({ row }) =>
        jurusan.data?.find((j) => j.id === row.original.jurusanId)?.nama ?? '—',
    },
    {
      accessorKey: 'dosenId',
      header: 'Dosen Pengampu',
      cell: ({ row }) =>
        dosen.data?.data.find((d) => d.id === row.original.dosenId)?.nama ?? '—',
    },
  ]

  return (
    <Card>
      <CardContent className="p-5">
        <DataTable
          columns={columns}
          data={daftar.data?.data ?? []}
          loading={daftar.isLoading}
          total={daftar.data?.total}
          halaman={daftar.data?.halaman}
          totalHalaman={daftar.data?.totalHalaman}
          onPageChange={setHalaman}
          search={search}
          onSearchChange={(v) => {
            setSearch(v)
            setHalaman(1)
          }}
          searchPlaceholder="Cari kode atau nama MK…"
        />
      </CardContent>
    </Card>
  )
}

export const mataKuliahRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/mata-kuliah',
  component: MataKuliahPage,
})
