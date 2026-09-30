import { useQuery } from '@tanstack/react-query'
import { createRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { ShieldCheck } from 'lucide-react'
import { DataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { queryKeys } from '@/hooks/query-keys'
import { userService } from '@/services'
import { ROLE_LABELS, type User } from '@/types'
import { layoutRoute } from '../_layout'

function PenggunaPage() {
  const daftar = useQuery({ queryKey: queryKeys.users.list, queryFn: userService.list })

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'nama',
      header: 'Nama',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-uho-navy/10 text-xs font-bold text-uho-navy">
            {row.original.nama.charAt(0)}
          </div>
          <span className="font-medium text-slate-800">{row.original.nama}</span>
        </div>
      ),
    },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'nip', header: 'NIP', cell: ({ getValue }) => getValue() ?? '—' },
    {
      accessorKey: 'role',
      header: 'Peran',
      cell: ({ getValue }) => {
        const r = getValue<User['role']>()
        return (
          <Badge tone={r === 'admin' ? 'red' : r === 'dekan' ? 'gold' : 'navy'}>
            <ShieldCheck className="mr-1 size-3" />
            {ROLE_LABELS[r]}
          </Badge>
        )
      },
    },
    { accessorKey: 'jabatan', header: 'Jabatan' },
  ]

  return (
    <Card>
      <CardContent className="p-5">
        <DataTable columns={columns} data={daftar.data ?? []} loading={daftar.isLoading} />
      </CardContent>
    </Card>
  )
}

export const penggunaRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/pengguna',
  component: PenggunaPage,
})
