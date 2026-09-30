import { useQuery } from '@tanstack/react-query'
import { createRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { DataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { queryKeys } from '@/hooks/query-keys'
import { jurusanService, mahasiswaService } from '@/services'
import type { Mahasiswa } from '@/types'
import { layoutRoute } from '../_layout'

const STATUS_TONE = {
  aktif: 'green',
  cuti: 'amber',
  lulus: 'blue',
  drop: 'red',
} as const

function MahasiswaPage() {
  const [search, setSearch] = useState('')
  const [jurusanId, setJurusanId] = useState('')
  const [halaman, setHalaman] = useState(1)

  const jurusan = useQuery({
    queryKey: queryKeys.jurusan.list,
    queryFn: jurusanService.list,
  })
  const daftar = useQuery({
    queryKey: queryKeys.mahasiswa.list({ search, jurusanId, halaman }),
    queryFn: () => mahasiswaService.list({ search, jurusanId, halaman }),
  })

  const namaJurusan = (id: string) =>
    jurusan.data?.find((j) => j.id === id)?.nama ?? '—'

  const columns: ColumnDef<Mahasiswa>[] = [
    { accessorKey: 'nim', header: 'NIM' },
    { accessorKey: 'nama', header: 'Nama' },
    {
      accessorKey: 'jurusanId',
      header: 'Jurusan',
      cell: ({ row }) => namaJurusan(row.original.jurusanId),
    },
    { accessorKey: 'angkatan', header: 'Angkatan' },
    { accessorKey: 'semester', header: 'Sem.' },
    { accessorKey: 'sks', header: 'SKS' },
    {
      accessorKey: 'ipk',
      header: 'IPK',
      cell: ({ getValue }) => (
        <span className="font-semibold text-uho-navy">{getValue<number>().toFixed(2)}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ getValue }) => {
        const s = getValue<Mahasiswa['status']>()
        return <Badge tone={STATUS_TONE[s]}>{s}</Badge>
      },
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
          searchPlaceholder="Cari NIM atau nama…"
          toolbarExtra={
            <Select
              value={jurusanId}
              onChange={(e) => {
                setJurusanId(e.target.value)
                setHalaman(1)
              }}
            >
              <option value="">Semua Jurusan</option>
              {jurusan.data?.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.nama}
                </option>
              ))}
            </Select>
          }
        />
      </CardContent>
    </Card>
  )
}

export const mahasiswaRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/mahasiswa',
  component: MahasiswaPage,
})
