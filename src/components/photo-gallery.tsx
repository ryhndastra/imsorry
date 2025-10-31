"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function PhotoGallery() {
  const [isOpened, setIsOpened] = useState(false)
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([])

  const toggleLocket = () => {
    setIsOpened((prev) => !prev)

    // jika membuka, munculkan hearts
    if (!isOpened) {
      const newHearts = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
      }))
      setHearts(newHearts)
      setTimeout(() => setHearts([]), 2000)
    }
  }

  return (
    <section className="py-20 px-4 relative z-10 min-h-screen flex flex-col items-center justify-center bg-rose-50">
      <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-rose-600 mb-4">
        Our Memory
      </h2>
      <p className="text-center text-rose-400/80 mb-16 text-lg">
        Click the love locket 💖
      </p>

      {/* Locket Container */}
      <div
        className="relative w-full max-w-md aspect-square flex items-center justify-center cursor-pointer"
        onClick={toggleLocket}
      >
        {/* Glow background */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-1000 ${
            isOpened
              ? "bg-rose-100/60 shadow-2xl shadow-rose-400/60"
              : "bg-rose-50/40 shadow-lg shadow-rose-300/20"
          }`}
        />

        {/* LEFT HALF */}
        <motion.svg
          initial={false}
          animate={isOpened ? { x: "-35%", rotateZ: -10 } : { x: "0%", rotateZ: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute w-full h-full"
          viewBox="0 0 300 300"
          style={{ pointerEvents: "none" }}
        >
          <path
            d="M150,280 C120,250 30,180 30,110 C30,65 65,40 95,40 C115,40 130,55 150,75 Z"
            fill="#f472b6"
            stroke="#db2777"
            strokeWidth="3"
          />
        </motion.svg>

        {/* RIGHT HALF */}
        <motion.svg
          initial={false}
          animate={isOpened ? { x: "35%", rotateZ: 10 } : { x: "0%", rotateZ: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute w-full h-full"
          viewBox="0 0 300 300"
          style={{ pointerEvents: "none" }}
        >
          <path
            d="M150,280 C180,250 270,180 270,110 C270,65 235,40 205,40 C185,40 170,55 150,75 Z"
            fill="#f472b6"
            stroke="#db2777"
            strokeWidth="3"
          />
        </motion.svg>

        {/* Photo inside with love frame */}
        <AnimatePresence>
          {isOpened && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-5/6 h-5/6 overflow-hidden">
                <svg viewBox="0 0 300 300" className="absolute w-full h-full">
                  <defs>
                    <clipPath id="heartClip">
                      <path d="M150,280 C120,250 30,180 30,110 C30,65 65,40 95,40 C115,40 130,55 150,75 C170,55 185,40 205,40 C235,40 270,65 270,110 C270,180 180,250 150,280 Z" />
                    </clipPath>
                  </defs>

                  <image
                    href="/images/akudandia.jpeg"
                    width="300"
                    height="300"
                    clipPath="url(#heartClip)"
                    preserveAspectRatio="xMidYMid slice"
                    className="rounded-full"
                  />

                  {/* glowing love frame */}
                  <path
                    d="M150,280 C120,250 30,180 30,110 C30,65 65,40 95,40 C115,40 130,55 150,75 C170,55 185,40 205,40 C235,40 270,65 270,110 C270,180 180,250 150,280 Z"
                    fill="none"
                    stroke="url(#gradGlow)"
                    strokeWidth="4"
                    className="drop-shadow-[0_0_12px_rgba(244,114,182,0.8)]"
                  />
                  <defs>
                    <linearGradient id="gradGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f9a8d4" />
                      <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hearts burst */}
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
            animate={{
              x: heart.x,
              y: heart.y,
              scale: [1, 1.5, 0.8],
              opacity: 0,
            }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="absolute text-2xl text-rose-500 pointer-events-none"
            style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          >
            💕
          </motion.div>
        ))}

        {/* Text prompt */}
        {!isOpened && (
          <p className="absolute -bottom-20 text-center text-sm font-semibold text-rose-500 animate-pulse">
            Click to open the locket
          </p>
        )}
        {isOpened && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-20 text-center text-sm font-semibold text-rose-500"
          >
            Our beautiful moment 💖
          </motion.p>
        )}
      </div>
    </section>
  )
}
