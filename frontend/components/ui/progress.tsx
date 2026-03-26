interface ProgressProps {
  value: number
  className?: string
}

export function Progress({ value, className = "" }: ProgressProps) {
  return (
    <div className={`h-2 w-full rounded-full bg-muted ${className}`.trim()}>
      <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
    </div>
  )
}
