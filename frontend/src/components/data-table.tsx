import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  data: T[]
  total?: number
  halaman?: number
  totalHalaman?: number
  onPageChange?: (halaman: number) => void
  search?: string
  onSearchChange?: (v: string) => void
  searchPlaceholder?: string
  toolbarExtra?: React.ReactNode
  loading?: boolean
}

/** Tabel generik berbasis TanStack Table — dipakai semua halaman data. */
export function DataTable<T>({
  columns,
  data,
  total,
  halaman = 1,
  totalHalaman = 1,
  onPageChange,
  search,
  onSearchChange,
  searchPlaceholder = 'Cari…',
  toolbarExtra,
  loading,
}: DataTableProps<T>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

  return (
    <div className="space-y-4">
      {(onSearchChange || toolbarExtra) && (
        <div className="flex flex-wrap items-center gap-3">
          {onSearchChange && (
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={search ?? ''}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="pl-9"
              />
            </div>
          )}
          <div className="ml-auto flex items-center gap-3">{toolbarExtra}</div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <Table>
          <THead>
            {table.getHeaderGroups().map((hg) => (
              <TR key={hg.id} className="bg-slate-50/70 hover:bg-slate-50">
                {hg.headers.map((h) => (
                  <TH key={h.id}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                  </TH>
                ))}
              </TR>
            ))}
          </THead>
          <TBody>
            {loading ? (
              <TR>
                <TD colSpan={columns.length} className="h-24 text-center text-slate-400">
                  Memuat data…
                </TD>
              </TR>
            ) : data.length === 0 ? (
              <TR>
                <TD colSpan={columns.length} className="h-24 text-center text-slate-400">
                  Tidak ada data.
                </TD>
              </TR>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TR key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TD key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TD>
                  ))}
                </TR>
              ))
            )}
          </TBody>
        </Table>
      </div>

      {onPageChange && (
        <div className="flex items-center justify-between text-xs text-slate-500">
          <p>
            Total {total ?? data.length} data · Halaman {halaman} dari {totalHalaman}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={halaman <= 1}
              onClick={() => onPageChange(halaman - 1)}
            >
              <ChevronLeft className="size-4" /> Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={halaman >= totalHalaman}
              onClick={() => onPageChange(halaman + 1)}
            >
              Berikutnya <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export function ThLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn(className)}>{children}</span>
}
