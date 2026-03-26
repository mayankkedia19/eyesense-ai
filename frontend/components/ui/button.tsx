import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

type ButtonVariant = "default" | "ghost" | "outline"
type ButtonSize = "default" | "lg"

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({ className = "", variant = "default", size = "default", ...props }: ButtonProps) {
  const variantClass = {
    default: "bg-primary text-primary-foreground",
    ghost: "bg-transparent",
    outline: "border border-border bg-transparent",
  }[variant]

  const sizeClass = {
    default: "px-4 py-2 text-sm",
    lg: "px-5 py-3 text-base",
  }[size]

  return (
    <button className={`${variantClass} ${sizeClass} rounded-md ${className}`.trim()} {...props} />
  )
}
