import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = "" }: CardProps) {
  return <div className={`rounded-xl border border-border bg-card ${className}`.trim()}>{children}</div>
}

export function CardHeader({ children, className = "" }: CardProps) {
  return <div className={`px-6 py-4 border-b border-border ${className}`.trim()}>{children}</div>
}

export function CardContent({ children, className = "" }: CardProps) {
  return <div className={`p-6 ${className}`.trim()}>{children}</div>
}

export function CardTitle({ children, className = "" }: CardProps) {
  return <h3 className={`text-lg font-semibold ${className}`.trim()}>{children}</h3>
}
