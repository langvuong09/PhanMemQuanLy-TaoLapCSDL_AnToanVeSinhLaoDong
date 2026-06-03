import clsx from "clsx"
import { ReactNode } from "react"

type ButtonProps = {
  children: ReactNode,
  variant?: "primary" | "outline",
  onClick?: () => void,
  type?: "button" | "submit" | "reset",
  className?: string
}

export default function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "font-medium rounded py-2 px-2",
        {
          "bg-primary text-white": variant === "primary",
          "border border-primary text-primary": variant === "outline"
        },
        className
      )}
    >
      {children}
    </button>
  )
}
