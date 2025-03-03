"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Array<{
    id: number
    size: number
    x: number
    y: number
    duration: number
    delay: number
  }>>([])

  useEffect(() => {
    // Generate particles only on the client side
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * -20,
      }))
    )
  }, [])

  if (particles.length === 0) return null

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-br from-violet-200 to-indigo-200 opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: ["0%", "100%", "0%"],
            x: [
              `${particle.x}%`,
              `${particle.x + (Math.random() * 10 - 5)}%`,
              `${particle.x}%`,
            ],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
} 