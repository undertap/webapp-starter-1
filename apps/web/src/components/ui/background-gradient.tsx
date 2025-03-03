import { cn } from "@/lib/utils"

interface BackgroundGradientProps extends React.HTMLAttributes<HTMLDivElement> {}

export function BackgroundGradient({ className, ...props }: BackgroundGradientProps) {
  return (
    <div
      className={cn(
        "relative bg-white dark:bg-gray-900",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-violet-950/50 dark:via-gray-900 dark:to-indigo-950/50" />
      <div className="relative">{props.children}</div>
    </div>
  )
} 