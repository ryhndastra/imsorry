"use client"

import { useState, useEffect } from "react"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [floatingHearts, setFloatingHearts] = useState<Array<{ id: number; left: number }>>([])

  useEffect(() => {
    setIsVisible(true)

    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
      }
      setFloatingHearts((prev) => [...prev, newHeart])
      setTimeout(() => {
        setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
      }, 3000)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      <div
        className={`text-center z-10 max-w-2xl transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      >
        <div className="mb-6 inline-block animate-pulse-subtle">
          <span className="text-7xl md:text-8xl animate-float">🌹</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight animate-slide-in-left">
          I'm Sorry
        </h1>

        <p
          className="text-xl md:text-2xl text-foreground/70 mb-8 leading-relaxed animate-slide-in-right"
          style={{ animationDelay: "0.2s" }}
        >
          I made a mistake, and I want you to know how truly sorry I am. You mean everything to me, and I hope this can
          be the start of making things right.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <button
            onClick={() => document.getElementById("messages")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl active:scale-95"
          >
            Read My Messages 💌
          </button>
        </div>
      </div>

      {/* Floating hearts background */}
      {floatingHearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed text-2xl pointer-events-none animate-float-up"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
          }}
        >
          ❤️
        </div>
      ))}
    </section>
  )
}
