"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface BackgroundGradientProps {
  children: React.ReactNode
  className?: string
}

export function BackgroundGradient({ children, className }: BackgroundGradientProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setPosition({ x, y })
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (opacity > 0) {
        setOpacity((prev) => Math.max(prev - 0.05, 0))
      }
    }, 50)

    return () => clearInterval(interval)
  }, [opacity])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative rounded-[inherit] overflow-hidden bg-white dark:bg-gray-900 shadow-xl", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-pink-500/20 dark:from-violet-500/10 dark:via-purple-500/10 dark:to-pink-500/10 opacity-50" />
      <div
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(120, 119, 198, 0.15), transparent 40%)`,
          width: "100%",
          height: "100%",
          opacity: opacity,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

