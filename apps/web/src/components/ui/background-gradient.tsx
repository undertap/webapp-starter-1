import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BackgroundGradientProps {
  children: ReactNode
  className?: string
}

export function BackgroundGradient({ children, className }: BackgroundGradientProps) {
  return (
    <div className={cn(
      "relative overflow-hidden bg-white rounded-3xl border shadow-xl",
      "bg-gradient-to-b from-white to-[#f2efea]/50",
      "before:absolute before:inset-0 before:-translate-y-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-[#dfe5f3]/50 before:to-transparent",
      "after:absolute after:inset-0 after:translate-y-full after:animate-[shimmer_2s_infinite] after:bg-gradient-to-r after:from-transparent after:via-[#557373]/10 after:to-transparent",
      className
    )}>
      {children}
    </div>
  )
} 