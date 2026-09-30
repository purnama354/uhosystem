import { useQuery } from '@tanstack/react-query'
import { createRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { DataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { queryKeys } from '@/hooks/query-keys'
import { dosenService, jurusanService } from '@/services'
import type { Dosen } from '@/types'
import { layoutRoute } from '../_layout'

function DosenPage() {
  const [search, setSearch] = useState('')
  const [halaman, setHalaman] = useState(1)

  const jurusan = useQuery({
    queryKey: queryKeys.jurusan.list,
    queryFn: jurusanService.list,
  })
  const daftar = useQuery({
    queryKey: queryKeys.dosen.list({ search, halaman }),
    queryFn: () => dosenService.list({ search, halaman }),
  })

  const columns: ColumnDef<Dosen>[] = [
    { accessorKey: 'nip', header: 'NIP' },
    {
      accessorKey: 'nama',
      header: 'Nama & Gelar',
      cell: ({ row }) => (
        <span className="font-medium text-slate-800">
          {row.original.nama}, {row.original.gelar}
        </span>
      ),
    },
    {
      accessorKey: 'jabatanFungsional',
      header: 'Jabatan Fungsional',
      cell: ({ row }) => (
        <Badge tone={row.original.jabatanFungsional === "Guru Besar" ? "gold" : "navy"}>
          {row.original.jabatanFungsional}
        </Badge>
      ),
    },
    {
      accessorKey: 'jurusanId',
      header: 'Jurusan',
      cell: ({ row }) =>
        jurusan.data?.find((j) => j.id === row.original.jurusanId)?.nama ?? '—',
    },
    { accessorKey: 'email', header: 'Email' },
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
          searchPlaceholder="Cari NIP atau nama…"
        />
      </CardContent>
    </Card>
  )
}

export const dosenRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/dosen',
  component: DosenPage,
})
