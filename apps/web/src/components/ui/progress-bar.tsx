import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ProgressBarProps {
  progress: number
  className?: string
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <motion.div
      className={cn("h-full transition-all", className)}
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    />
  )
} 