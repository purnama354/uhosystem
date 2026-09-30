import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Tone = 'navy' | 'blue' | 'green' | 'amber' | 'red' | 'slate' | 'gold'

const tones: Record<Tone, string> = {
  navy: 'bg-uho-navy/10 text-uho-navy',
  blue: 'bg-uho-blue/10 text-uho-blue',
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  red: 'bg-red-50 text-red-700',
  slate: 'bg-slate-100 text-slate-600',
  gold: 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-200',
}

export function Badge({
  className,
  tone = 'slate',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
