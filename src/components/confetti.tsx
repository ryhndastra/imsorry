"use client"

import { useState, useEffect } from "react"

interface ConfettiPiece {
  id: number
  left: number
  delay: number
  duration: number
}

export default function Confetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      const pieces = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1,
      }))
      setConfetti(pieces)

      setTimeout(() => setConfetti([]), 3500)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="fixed w-2 h-2 pointer-events-none animate-float-up"
          style={{
            left: `${piece.left}%`,
            top: "-10px",
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        >
          {["💕", "✨", "🌹", "💖"][piece.id % 4]}
        </div>
      ))}
    </>
  )
}
