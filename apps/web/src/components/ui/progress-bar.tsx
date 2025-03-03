import { cn } from "@/lib/utils"

interface ProgressBarProps {
  progress: number
  className?: string
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div
      className={cn(
        "h-full bg-violet-600 dark:bg-violet-500 transition-all duration-300 ease-in-out",
        className
      )}
      style={{ width: `${progress}%` }}
    />
  )
} 