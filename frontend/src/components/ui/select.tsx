import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'h-10 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-uho-blue focus:outline-none focus:ring-2 focus:ring-uho-blue/20',
        className,
      )}
      {...props}
    />
  ),
)
Select.displayName = 'Select'
